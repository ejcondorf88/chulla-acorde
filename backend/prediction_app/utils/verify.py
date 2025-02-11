import json
import numpy as np
from sklearn.model_selection import train_test_split
from keras.utils import to_categorical
from collections import Counter

def analyze_and_prepare_data(json_path):
    """
    Analiza y prepara los datos MFCC y etiquetas para entrenar un modelo LSTM.
    Incluye validaciones para evitar errores comunes.
    """
    # Cargar datos
    with open(json_path, "r") as fp:
        data = json.load(fp)
    
    # Extraer información básica
    mfccs = np.array(data["mfcc"])
    labels = np.array(data["labels"])
    mapping = data["mapping"]
    num_classes = len(mapping)
    
    print("\n=== Información General ===")
    print(f"Número total de muestras: {len(mfccs)}")
    print(f"Número de clases: {num_classes}")
    print(f"Dimensiones de cada MFCC: {mfccs[0].shape}")
        # Ver el contenido de 'labels'
    print("\nLabels (etiquetas de clase ssssssssssss):")
    print(data["labels"])
    # Verificar consistencia de formas en MFCCs
    mfcc_shapes = [mfcc.shape for mfcc in mfccs]
    if len(set(mfcc_shapes)) != 1:
        raise ValueError("¡Error! Las muestras MFCC tienen formas inconsistentes.")
    else:
        print("✓ Todas las muestras MFCC tienen la misma forma.")
    
    # Verificar valores de MFCCs
    print(f"Rango de valores MFCC: [{np.min(mfccs):.2f}, {np.max(mfccs):.2f}]")
    print(f"Media de valores MFCC: {np.mean(mfccs):.2f}")
    print(f"Desviación estándar de valores MFCC: {np.std(mfccs):.2f}")
    
    # Verificar distribución de etiquetas
    label_counts = Counter(labels)
    print("\n=== Distribución de Etiquetas ===")
    for label_idx, count in label_counts.items():
        print(f"{mapping[label_idx]}: {count} muestras")
    
    # Convertir etiquetas a one-hot encoding
    labels_one_hot = to_categorical(labels, num_classes=num_classes)
    print("\nEtiquetas convertidas a one-hot encoding.")
    
    # Dividir los datos en entrenamiento, validación y prueba
    X_train, X_test, y_train, y_test = train_test_split(
        mfccs, labels_one_hot, test_size=0.2, random_state=42, stratify=labels
    )
    X_train, X_val, y_train, y_val = train_test_split(
        X_train, y_train, test_size=0.25, random_state=42, stratify=np.argmax(y_train, axis=1)
    )
    
    # Normalizar los MFCCs
    def normalize_mfcc(mfcc):
        return (mfcc - np.mean(mfcc)) / np.std(mfcc)
    
    X_train = np.array([normalize_mfcc(mfcc) for mfcc in X_train])
    X_val = np.array([normalize_mfcc(mfcc) for mfcc in X_val])
    X_test = np.array([normalize_mfcc(mfcc) for mfcc in X_test])
    
    # Validar formas finales
    print("\n=== Validación de Formas ===")
    print(f"Forma de X_train: {X_train.shape}")
    print(f"Forma de y_train: {y_train.shape}")
    print(f"Forma de X_val: {X_val.shape}")
    print(f"Forma de y_val: {y_val.shape}")
    print(f"Forma de X_test: {X_test.shape}")
    print(f"Forma de y_test: {y_test.shape}")
    
    # Validar compatibilidad entre X e y
    if X_train.shape[0] != y_train.shape[0]:
        raise ValueError("¡Error! El número de muestras en X_train y y_train no coincide.")
    if X_val.shape[0] != y_val.shape[0]:
        raise ValueError("¡Error! El número de muestras en X_val y y_val no coincide.")
    if X_test.shape[0] != y_test.shape[0]:
        raise ValueError("¡Error! El número de muestras en X_test y y_test no coincide.")
    
    print("\n✓ Validación completada. Los datos están listos para entrenar el modelo.")
    
    return X_train, X_val, X_test, y_train, y_val, y_test, mapping

# Ejemplo de uso
if __name__ == "__main__":
    json_path = r"C:\workspace\chulla-acorde\backend\prediction_app\utils\datos_acordes.json"
    try:
        X_train, X_val, X_test, y_train, y_val, y_test, mapping = analyze_and_prepare_data(json_path)
    except Exception as e:
        print(f"Error durante la preparación de datos: {e}")