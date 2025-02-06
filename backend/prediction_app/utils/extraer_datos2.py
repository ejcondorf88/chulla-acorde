import json
import os
import math
import librosa
import scipy

DATASET_PATH = "F:\Datos 2.0"
JSON_PATH = "F:\ProyectoExpoMineria\PruebaRNN\JSON\datos_acordes.json"
SAMPLE_RATE = 22050 #FRECUENCIA DE MUESTREO
TRACK_DURATION = 6  # DURACION DE LA PISTA DE AUDIO
MUESTRA_POR_TRACK = SAMPLE_RATE * TRACK_DURATION

def normalize_audio(signal):
    """Normaliza la señal de audio al rango [-1,1]."""
    return signal / max(abs(signal)) if max(abs(signal)) != 0 else signal


def save_mfcc(dataset_path, json_path, num_mfcc=13, n_fft=2048, hop_length=512, num_segments=5):
    """Extracts MFCCs from music dataset and saves them into a json file along witgh genre labels.

        :param dataset_path (str): Path to dataset
        :param json_path (str): Path to json file used to save MFCCs
        :param num_mfcc (int): Number of coefficients to extract
        :param n_fft (int): Interval we consider to apply FFT. Measured in # of samples
        :param hop_length (int): Sliding window for FFT. Measured in # of samples
        :param: num_segments (int): Number of segments we want to divide sample tracks into
        :return:
        """

    # dictionary to store mapping, labels, and MFCCs
    data = {
        "mapping": [],
        "labels": [],
        "mfcc": []
    }

    num_muestras_por_segmento = int(MUESTRA_POR_TRACK / num_segments)
    num_mfcc_vectors_per_segment = math.ceil(num_muestras_por_segmento / hop_length) #redondea para no dejar en decimal

    # loop through all genre sub-folder
    for i, (dirpath, dirnames, filenames) in enumerate(os.walk(dataset_path)):

        # ensure we're processing a genre sub-folder level
        if dirpath is not dataset_path:

            # save genre label (i.e., sub-folder name) in the mapping
            semantic_label = dirpath.split("/")[-1]
            data["mapping"].append(semantic_label)
            print("\nProcessing: {}".format(semantic_label))

            # process all audio files in genre sub-dir
            for f in filenames:

                # load audio file
                file_path = os.path.join(dirpath, f)
                signal, sample_rate = librosa.load(file_path, sr=SAMPLE_RATE)

                # Normalizar la señal de audio antes de extraer características
                signal = normalize_audio(signal)

                # process all segments of audio file
                for s in range(num_segments):

                    # calculate start and finish sample for current segment
                    inicio_sample = num_muestras_por_segmento * s #s es el segmento actual donde estamos
                    fin_sample = inicio_sample + num_muestras_por_segmento

                    # extraemos los MFCCs, simple_rate = frecuencia de muestreo
                    mfcc = librosa.feature.mfcc(y=signal[inicio_sample:fin_sample],
                                                sr=sample_rate,#frecuencia de muestreo
                                                n_mfcc=num_mfcc, #numero de mfcc
                                                n_fft=n_fft,# numero de intervalos para la transformada de fourier
                                                hop_length=hop_length) #longitud de salto
                    mfcc = mfcc.T

                    # almacenar Mfcc por segmento if tiene la longitud esperada
                    if len(mfcc) == num_mfcc_vectors_per_segment: #solo si tenemso el numero de vectores esperados en cada segmento
                        data["mfcc"].append(mfcc.tolist()) #transformamos la matriz en una lista
                        data["labels"].append(i - 1) #i cada iteracion es una carpeta de etiqueta diferente
                        print("{}, segment:{}".format(file_path, s + 1))

    # save MFCCs to json file
    with open(json_path, "w") as fp:
        json.dump(data, fp, indent=4)


if __name__ == "__main__":
    save_mfcc(DATASET_PATH, JSON_PATH, num_segments=10)
