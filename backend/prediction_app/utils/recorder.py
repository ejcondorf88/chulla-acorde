import librosa
import numpy as np
from keras.models import load_model
import pickle

class ChordPredictor:
    def __init__(self, model_path, encoder_path, mean_std_path=None):
        self.model = load_model(model_path)
        with open(encoder_path, 'rb') as f:
            self.encoder = pickle.load(f)
        
        # Cargar parámetros de normalización si existen
        if mean_std_path:
            self.mfcc_mean = np.load(f'{mean_std_path}_mean.npy')
            self.mfcc_std = np.load(f'{mean_std_path}_std.npy')
        else:
            self.mfcc_mean = None
            self.mfcc_std = None

    def process_audio(self, file_path, chunk_duration=3, sr=22050):
        # Cargar audio
        audio, sr = librosa.load(file_path, sr=sr)
        
        # Calcular tamaño del fragmento en muestras
        chunk_size = int(chunk_duration * sr)
        
        # Dividir en fragmentos no superpuestos
        chunks = [audio[i:i+chunk_size] 
                for i in range(0, len(audio), chunk_size)
                if len(audio[i:i+chunk_size]) == chunk_size]
        
        return chunks, sr

    def extract_features(self, chunk, sr=22050, n_mfcc=13, n_fft=2048, hop_length=512):
        # Extraer MFCCs
        mfcc = librosa.feature.mfcc(
            y=chunk,
            sr=sr,
            n_mfcc=n_mfcc,
            n_fft=n_fft,
            hop_length=hop_length
        )
        
        # Transponer para obtener (tiempo, características)
        mfcc = mfcc.T
        
        # Asegurar dimensiones correctas
        expected_steps = self.model.input_shape[1]
        if mfcc.shape[0] != expected_steps:
            mfcc = self._adjust_length(mfcc, expected_steps)
        
        # Normalización
        if self.mfcc_mean is not None and self.mfcc_std is not None:
            mfcc = (mfcc - self.mfcc_mean) / self.mfcc_std
        else:
            mfcc = (mfcc - np.mean(mfcc)) / np.std(mfcc)
        
        return mfcc

    def _adjust_length(self, mfcc, target_length):
        # Ajustar la longitud del MFCC mediante padding o truncamiento
        if mfcc.shape[0] < target_length:
            pad_width = target_length - mfcc.shape[0]
            return np.pad(mfcc, ((0, pad_width), (0, 0)), mode='constant')
        else:
            return mfcc[:target_length, :]

    def predict(self, file_path):
        # Procesar audio
        chunks, sr = self.process_audio(file_path)
        
        predictions = []
        for chunk in chunks:
            # Extraer características
            features = self.extract_features(chunk, sr)
            
            # Redimensionar para el modelo (batch_size, timesteps, features)
            features = np.expand_dims(features, axis=0)
            
            # Predecir
            prediction = self.model.predict(features)
            predicted_class = np.argmax(prediction)
            chord = self.encoder.inverse_transform([predicted_class])[0]
            
            predictions.append({
                'chord': chord,
                'confidence': float(np.max(prediction))
            })
        
        return predictions

# Uso ejemplo
if __name__ == "__main__":
    predictor = ChordPredictor(
        model_path=r'C:\workspace\chulla-acorde\backend\models\chord_model.h5',
        encoder_path='models/label_encoder.pkl',
    )
    
    predictions = predictor.predict(r'C:\workspace\chulla-acorde\backend\prediction_app\utils\audio.wav')
    
    print("\nPredicciones por fragmento:")
    for i, pred in enumerate(predictions):
        print(f"Fragmento {i+1}: {pred['chord']} (Confianza: {pred['confidence']:.2%})")