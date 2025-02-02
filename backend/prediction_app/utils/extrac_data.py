import json
import os
import librosa

# Definición de constantes
DATASET_PATH = r"C:\Users\Jose\Desktop\datos\Training"
JSON_PATH = "data_Acordes.json"
SAMPLE_RATE = 22050  # Frecuencia de muestreo
DURACION_TRACK = 3  # Medido en segundos
SAMPLES_POR_TRACK = SAMPLE_RATE * DURACION_TRACK


def save_mfcc(dataset_path, json_path, num_mfcc=40, n_fft=2048, hop_length=512):
    """
    Extrae MFCCs de archivos de audio pequeños y los guarda en un archivo JSON junto con las etiquetas de acordes.

    :param dataset_path (str): Ruta al conjunto de datos
    :param json_path (str): Ruta al archivo JSON usado para guardar los MFCCs
    :param num_mfcc (int): Número de coeficientes a extraer
    :param n_fft (int): Intervalo para aplicar FFT. Medido en número de muestras
    :param hop_length (int): Ventana deslizante para FFT. Medido en número de muestras
    :return:
    """

    # Diccionario para almacenar el mapeo, etiquetas y MFCCs
    data = {"mapping": [], "labels": [], "mfcc": []}

    # Itera a través de todas las subcarpetas
    for i, (dirpath, dirnames, filenames) in enumerate(os.walk(dataset_path)):

        # Asegurarse de que estamos procesando el nivel de subcarpeta
        if dirpath is not dataset_path:

            # Guarda la etiqueta (es decir, el nombre de la subcarpeta) en el mapeo
            etiqueta_semantica = os.path.basename(dirpath)
            data["mapping"].append(etiqueta_semantica)
            print("\nProcesando: {}".format(etiqueta_semantica))

            # Procesa todos los archivos de audio en la subcarpeta
            for f in filenames:

                # Carga el archivo de audio
                file_path = os.path.join(dirpath, f)
                signal, sample_rate = librosa.load(file_path, sr=SAMPLE_RATE)

                # Extrae los MFCC del audio completo
                mfcc = librosa.feature.mfcc(
                    y=signal,
                    sr=sample_rate,
                    n_mfcc=num_mfcc,
                    n_fft=n_fft,
                    hop_length=hop_length,
                )
                mfcc = mfcc.T

                # Almacena las características MFCC
                data["mfcc"].append(mfcc.tolist())
                # Almacena la etiqueta del acorde (nombre de la subcarpeta)
                data["labels"].append(etiqueta_semantica)
                print("Procesado: {}".format(file_path))

    # Guarda los MFCCs en el archivo JSON
    with open(json_path, "w") as fp:
        json.dump(data, fp, indent=4)


if __name__ == "__main__":
    save_mfcc(DATASET_PATH, JSON_PATH, num_mfcc=40, n_fft=2048, hop_length=512)
