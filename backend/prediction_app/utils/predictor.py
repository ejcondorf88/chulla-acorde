import librosa
import numpy as np
import tensorflow as tf
import json

class AudioPredictor:
    def __init__(self, model_path, json_path, sample_rate=22050, duration=8.0, hop_length=512, n_fft=2048, n_mfcc=13):
        self.model = tf.keras.models.load_model(model_path)
        self.sample_rate = sample_rate
        self.duration = duration
        self.hop_length = hop_length
        self.n_fft = n_fft
        self.n_mfcc = n_mfcc
        
        # Cargar el mapeo de etiquetas desde el archivo JSON
        with open(json_path, "r") as fp:
            self.data = json.load(fp)
        self.mapping = self.data["mapping"]

    def load_audio(self, file_path):
        """Carga y normaliza el audio."""
        print(f"Ruta del archivo de audio: {file_path}")  # Depuración
        audio, _ = librosa.load(file_path, sr=self.sample_rate)
        print(f"Duración del audio: {len(audio) / self.sample_rate} segundos")  # Depuración
        audio = audio / np.max(np.abs(audio))  # Normalizar a [-1, 1]
        return audio

    def extract_mfccs(self, audio):
        """Extrae los MFCCs del audio."""
        mfccs = librosa.feature.mfcc(
            y=audio,
            sr=self.sample_rate,
            n_mfcc=self.n_mfcc,
            n_fft=self.n_fft,
            hop_length=self.hop_length
        )
        print(f"Forma de los MFCCs: {mfccs.T.shape}")  # Depuración
        return mfccs.T  # Forma: (time_steps, n_mfcc)

    def split_audio(self, audio):
        """Divide el audio en segmentos de 8 segundos."""
        samples_per_segment = int(self.sample_rate * self.duration)
        segments = []
        for start in range(0, len(audio), samples_per_segment):
            end = start + samples_per_segment
            if end > len(audio):
                # Rellenar el último segmento con ceros si es más corto
                segment = np.zeros(samples_per_segment)
                segment[:len(audio[start:])] = audio[start:]
            else:
                segment = audio[start:end]
            segments.append(segment)
        return segments

    def predict_segments(self, file_path):
        """Realiza la predicción para cada segmento de 8 segundos."""
        audio = self.load_audio(file_path)
        segments = self.split_audio(audio)
        predictions = []
        
        for segment in segments:
            mfccs = self.extract_mfccs(segment)
            # if mfccs.shape[0] == 352:  # Comenta temporalmente para depuración
            mfccs = mfccs[np.newaxis, ...]  # Forma: (1, time_steps, 13)
            prediction = self.model.predict(mfccs)
            predicted_label = np.argmax(prediction, axis=1)[0]
            predicted_chord = self.mapping[predicted_label]  # Obtener nombre del acorde
            chord_name = predicted_chord.split("\\")[-1]  # Tomar el último elemento después de \
            predictions.append(chord_name)
        
        return predictions

# Uso del predictor
if __name__ == "__main__":
    model_path = r"C:\workspace\chulla-acorde\backend\models\ensemble_model_1.h5"  # Ruta al modelo guardado
    json_path = r"C:\workspace\chulla-acorde\backend\prediction_app\utils\datos_acordes.json"  # Ruta al archivo JSON
    audio_file = r"C:\workspace\chulla-acorde\backend\prediction_app\utils\audio.wav"  # Ruta al archivo de audio

    predictor = AudioPredictor(model_path, json_path, duration=8.0)
    predictions = predictor.predict_segments(audio_file)

    # Formatear la salida como una lista de acordes
    formatted_predictions = [f"'{chord}'" for chord in predictions]
    print("[\n    " + ",\n    ".join(formatted_predictions) + "\n]")