import json
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from collections import Counter

def analyze_mfcc_data(json_path):
    """
    Analiza y visualiza los datos MFCC del archivo JSON.
    """
    # Cargar datos
    with open(json_path, "r") as fp:
        data = json.load(fp)
    
    # Extraer información básica
    num_samples = len(data["mfcc"])
    num_classes = len(data["mapping"])
    mfcc_shape = np.array(data["mfcc"][0]).shape
    
    # Análisis de etiquetas
    label_counts = Counter(data["labels"])
    
    print("\n=== Información General ===")
    print(f"Número total de muestras: {num_samples}")
    print(f"Número de clases: {num_classes}")
    print(f"Dimensiones de cada MFCC: {mfcc_shape}")
    print("\n=== Distribución de Clases ===")
    for label_idx, count in label_counts.items():
        print(f"{data['mapping'][label_idx]}: {count} muestras")
    
    # Visualizaciones
    plt.figure(figsize=(15, 10))
    
    # 1. Distribución de clases
    plt.subplot(2, 2, 1)
    plt.bar(data["mapping"], [label_counts[i] for i in range(num_classes)])
    plt.xticks(rotation=45)
    plt.title("Distribución de Clases")
    plt.xlabel("Clase")
    plt.ylabel("Número de muestras")
    
    # 2. Ejemplo de MFCC
    plt.subplot(2, 2, 2)
    example_mfcc = np.array(data["mfcc"][0])
    sns.heatmap(example_mfcc.T, cmap='viridis')
    plt.title("Ejemplo de MFCC")
    plt.xlabel("Frames")
    plt.ylabel("Coeficientes MFCC")
    
    # 3. Estadísticas de MFCC
    all_mfcc_values = np.concatenate([np.array(mfcc).flatten() for mfcc in data["mfcc"]])
    plt.subplot(2, 2, 3)
    plt.hist(all_mfcc_values, bins=50)
    plt.title("Distribución de valores MFCC")
    plt.xlabel("Valor MFCC")
    plt.ylabel("Frecuencia")
    
    # 4. Análisis de valores atípicos por clase
    plt.subplot(2, 2, 4)
    mfcc_means_by_class = []
    for i in range(num_classes):
        class_mfccs = [np.array(data["mfcc"][j]) for j, label in enumerate(data["labels"]) if label == i]
        class_means = np.mean([np.mean(mfcc) for mfcc in class_mfccs])
        mfcc_means_by_class.append(class_means)
    
    plt.boxplot([mfcc_means_by_class])
    plt.title("Distribución de medias MFCC por clase")
    plt.xticks([1], ["Clases"])
    
    plt.tight_layout()
    plt.show()
    
    # Verificar consistencia de datos
    print("\n=== Verificación de Datos ===")
    shapes = [np.array(mfcc).shape for mfcc in data["mfcc"]]
    if len(set(shapes)) == 1:
        print("✓ Todas las muestras MFCC tienen la misma forma")
    else:
        print("⚠ ¡Advertencia! Hay muestras MFCC con diferentes formas")
    
    # Verificar valores
    mfcc_array = np.array(data["mfcc"])
    print(f"Rango de valores MFCC: [{np.min(mfcc_array):.2f}, {np.max(mfcc_array):.2f}]")
    print(f"Media de valores MFCC: {np.mean(mfcc_array):.2f}")
    print(f"Desviación estándar de valores MFCC: {np.std(mfcc_array):.2f}")
    
    return data

if __name__ == "__main__":
    json_path = "F:/ProyectoExpoMineria/PruebaRNN/JSON/datos_acordes.json"  # Ajusta esta ruta
    data = analyze_mfcc_data(json_path)