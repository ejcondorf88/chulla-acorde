import json
import numpy as np
import os
import matplotlib.pyplot as plt
import seaborn as sns
import tensorflow as tf
from sklearn.model_selection import train_test_split, KFold
from sklearn.metrics import confusion_matrix, classification_report
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout, Bidirectional, BatchNormalization
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.losses import SparseCategoricalCrossentropy
from tensorflow.keras import layers, models, optimizers


class ChordModel:
    DATA_PATH = r"C:\workspace\chulla-acorde\backend\prediction_app\utils\datos_acordes.json"
    MODEL_PATH = "models/chord_model"

    @staticmethod
    def load_data(json_path):
        """Carga los datos desde un archivo JSON."""
        with open(json_path, "r") as fp:
            data = json.load(fp)
        
        X = np.array(data["mfcc"])
        y = np.array(data["labels"])
        mapping = data["mapping"]
        
        return X, y, mapping

    @staticmethod
    def apply_augmentation(X, y):
        """Aplica técnicas de data augmentation."""
        augmented_X = []
        augmented_y = []
        
        for i in range(len(X)):
            # Añadir dato original
            augmented_X.append(X[i])
            augmented_y.append(y[i])
            
            # Añadir versión con ruido
            noise_factor = 0.05
            noisy = X[i] + noise_factor * np.random.normal(0, 1, X[i].shape)
            augmented_X.append(noisy)
            augmented_y.append(y[i])
            
            # Añadir versión con time stretching (simulado con interpolación)
            stretch_factor = 1.1
            time_steps = X[i].shape[0]
            stretched = np.array([np.interp(
                np.linspace(0, time_steps-1, int(time_steps*stretch_factor)),
                np.arange(time_steps),
                X[i][:, j]
            ) for j in range(X[i].shape[1])]).T
            stretched = stretched[:time_steps]  # Mantener tamaño original
            augmented_X.append(stretched)
            augmented_y.append(y[i])
        
        return np.array(augmented_X), np.array(augmented_y)

    @staticmethod
    def prepare_datasets(test_size, validation_size, use_augmentation=True):
        """Prepara los datasets con validación cruzada opcional."""
        X, y, mapping = ChordModel.load_data(ChordModel.DATA_PATH)
        
        if use_augmentation:
            X, y = ChordModel.apply_augmentation(X, y)
        
        # División inicial para conjunto de prueba
        X_train_val, X_test, y_train_val, y_test = train_test_split(
            X, y, test_size=test_size, random_state=42, stratify=y
        )
        
        # División para conjunto de validación
        X_train, X_val, y_train, y_val = train_test_split(
            X_train_val, y_train_val, 
            test_size=validation_size, 
            random_state=42, 
            stratify=y_train_val
        )
        
        print(f"Forma de X_train: {X_train.shape}")
        print(f"Forma de X_val: {X_val.shape}")
        print(f"Forma de X_test: {X_test.shape}")
        
        return X_train, X_val, X_test, y_train, y_val, y_test, mapping

    @staticmethod
    def build_model(input_shape, num_classes):
        """Construye un modelo LSTM bidireccional mejorado."""
        model = Sequential([
            # Primera capa LSTM bidireccional
            Bidirectional(LSTM(128, return_sequences=True), input_shape=input_shape),
            BatchNormalization(),
            Dropout(0.3),
            
            # Segunda capa LSTM bidireccional
            Bidirectional(LSTM(64, return_sequences=True)),
            BatchNormalization(),
            Dropout(0.3),
            
            # Tercera capa LSTM bidireccional
            Bidirectional(LSTM(32)),
            BatchNormalization(),
            Dropout(0.3),
            
            # Capas densas
            Dense(128, activation='relu'),
            BatchNormalization(),
            Dropout(0.3),
            
            Dense(64, activation='relu'),
            BatchNormalization(),
            Dropout(0.2),
            
            # Capa de salida
            Dense(num_classes, activation='softmax')
        ])
        
        return model

    @staticmethod
    def compile_model(model, learning_rate=0.001):
        """Compila el modelo con configuración optimizada."""
        optimizer = Adam(learning_rate=learning_rate)
        model.compile(
            optimizer=optimizer,
            loss=SparseCategoricalCrossentropy(),
            metrics=['accuracy']
        )

    @staticmethod
    def train_model(model, X_train, y_train, X_val, y_val, epochs=100, batch_size=32):
        """Entrena el modelo con callbacks mejorados."""
        callbacks = [
            EarlyStopping(
                monitor='val_loss',
                patience=20,
                restore_best_weights=True,
                min_delta=0.001
            ),
            ModelCheckpoint(
                'models/best_model.h5',
                save_best_only=True,
                monitor='val_accuracy',
                mode='max'
            ),
            ReduceLROnPlateau(
                monitor='val_loss',
                factor=0.2,
                patience=7,
                min_lr=1e-6,
                min_delta=0.001
            )
        ]
        
        history = model.fit(
            X_train, y_train,
            validation_data=(X_val, y_val),
            epochs=epochs,
            batch_size=batch_size,
            callbacks=callbacks,
            verbose=1
        )
        return history

    @staticmethod
    def create_ensemble(input_shape, num_classes, num_models=3):
        """Crea un conjunto de modelos para ensamblar."""
        models = []
        for i in range(num_models):
            model = ChordModel.build_model(input_shape, num_classes)
            ChordModel.compile_model(model)
            models.append(model)
        return models

    @staticmethod
    def train_ensemble(models, X_train, y_train, X_val, y_val, epochs=100, batch_size=32):
        """Entrena cada modelo del ensemble."""
        histories = []
        for i, model in enumerate(models):
            print(f"\nEntrenando modelo {i+1}/{len(models)}")
            history = ChordModel.train_model(model, X_train, y_train, X_val, y_val, epochs, batch_size)
            histories.append(history)
        return histories

    @staticmethod
    def ensemble_predict(models, X):
        """Realiza predicciones usando el ensemble de modelos."""
        predictions = np.array([model.predict(X) for model in models])
        return np.mean(predictions, axis=0)

    @staticmethod
    def plot_history(history):
        """Grafica el historial del entrenamiento con más métricas."""
        fig, axs = plt.subplots(2, 1, figsize=(12, 12))
        
        # Precisión
        axs[0].plot(history.history['accuracy'], label='Train Accuracy')
        axs[0].plot(history.history['val_accuracy'], label='Validation Accuracy')
        axs[0].set_title('Accuracy Evolution')
        axs[0].set_ylabel('Accuracy')
        axs[0].set_xlabel('Epoch')
        axs[0].legend()
        axs[0].grid(True)
        
        # Pérdida
        axs[1].plot(history.history['loss'], label='Train Loss')
        axs[1].plot(history.history['val_loss'], label='Validation Loss')
        axs[1].set_title('Loss Evolution')
        axs[1].set_ylabel('Loss')
        axs[1].set_xlabel('Epoch')
        axs[1].legend()
        axs[1].grid(True)
        
        plt.tight_layout()
        plt.show()

    @staticmethod
    def evaluate_model(model, X_test, y_test, classes):
        """Evalúa el modelo con métricas detalladas."""
        y_pred_prob = model.predict(X_test)
        y_pred = np.argmax(y_pred_prob, axis=1)
        
        # Matriz de confusión
        cm = confusion_matrix(y_test, y_pred)
        plt.figure(figsize=(15, 12))
        sns.heatmap(
            cm, 
            annot=True, 
            fmt='d', 
            cmap='Blues',
            xticklabels=classes,
            yticklabels=classes
        )
        plt.title('Matriz de Confusión')
        plt.ylabel('True Label')
        plt.xlabel('Predicted Label')
        plt.xticks(rotation=45)
        plt.yticks(rotation=45)
        plt.tight_layout()
        plt.savefig('models/confusion_matrix.png')
        plt.close()
        
        # Métricas detalladas
        print("\n=== Classification Report ===")
        print(classification_report(y_test, y_pred, target_names=classes))
        
        # Calcular métricas adicionales
        accuracy = np.mean(y_pred == y_test)
        print(f"\nTest Accuracy: {accuracy:.4f}")
        
        # Análisis de errores
        errors = np.where(y_pred != y_test)[0]
        print(f"\nNúmero total de errores: {len(errors)}")
        
        return accuracy, cm, errors

if __name__ == "__main__":
    # Configuración
    config = {
        'epochs': 100,
        'batch_size': 32,
        'learning_rate': 0.001,
        'use_ensemble': True,
        'num_models': 1
    }
    
    # Preparar datos
    X_train, X_val, X_test, y_train, y_val, y_test, classes = ChordModel.prepare_datasets(0.2, 0.2, use_augmentation=True)
    
    input_shape = (X_train.shape[1], X_train.shape[2])
    num_classes = len(np.unique(y_train))
    
    if config['use_ensemble']:
        # Entrenamiento con ensemble
        models = ChordModel.create_ensemble(input_shape, num_classes, config['num_models'])
        histories = ChordModel.train_ensemble(
            models, X_train, y_train, X_val, y_val,
            config['epochs'], config['batch_size']
        )
        
        # Evaluación del ensemble
        y_pred_prob = ChordModel.ensemble_predict(models, X_test)
        y_pred = np.argmax(y_pred_prob, axis=1)
        accuracy = np.mean(y_pred == y_test)
        for i, model in enumerate(models):
                model.save(f"models/ensemble_model_{i+1}.h5")
                print(f"Modelo {i+1} guardado en 'models/ensemble_model_{i+1}.h5'")
        
    else:
        # Entrenamiento de un solo modelo
        model = ChordModel.build_model(input_shape, num_classes)
        ChordModel.compile_model(model, config['learning_rate'])
        history = ChordModel.train_model(
            model, X_train, y_train, X_val, y_val,
            config['epochs'], config['batch_size']
        )
        ChordModel.plot_history(history)
        accuracy, conf_matrix, errors = ChordModel.evaluate_model(model, X_test, y_test, classes)