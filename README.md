
# Chulla Acorde - Reconocieinto de Acordes por IA

## Descripción 
Esta aplicación ofrece una manera sencilla e interactiva de obtener los acordes de guitarra de cualquier canción a partir de un enlace de YouTube. Está diseñada para músicos aficionados que disfrutan tocar su instrumento de forma casual, sin necesidad de un profundo conocimiento en teoría musical o composición. Ahora, desarrollar el oído musical es más fácil y accesible para todos.

## Tabla de Contenidos
1. [Instalación](#instalación)
2. [Iniciar Sevidor Backend](#iniciar_servidor_backend)
3. [Configurar Frontend](#configurar_frontend)
4. [Iniciar el servidor frontend](#iniciar_el_servidor_frontend)
5. [Uso](#uso)
6. [Scripts](#scripts)
5. [Autores](#autores)

## Instalación
Para instalar Chulla Acorde, sigue los siguientes pasos:
git clone https://github.com/ejcondorf88/chulla-acorde
1. Creamos un entorno virtual: python -m venv mi_entorno   y lo activamos mi_entorno\Scripts\activate
2. Instalamos las dependencias:  pip install requerimientos.txt

## Iniciar servidor backend
En npm :  en  bash > npm start 
En yarn : en bash > yarn start

## Configurar Frontend
bash > cd ../frontend
Si usas npm: bash> npm install
Si usas yarn:bash > yarn install
( Configura las variables de entorno necesarias, como la URL del backend o claves de servicios externos.)

## Iniciar el servidor frontend
Si usas npm: bash > npm start
Si usas yarn:bash > yarn start
Esto debería abrir el frontend en http://localhost:3000 (o el puerto que hayas configurado).

## Uso
- El servidor backend está corriendo en http://localhost:5000 (o el puerto que hayas configurado).

- El servidor frontend está corriendo en http://localhost:3000 (o el puerto que hayas configurado).
Asegúrate de que el frontend esté apuntando al backend correctamente, según la URL de la API.

## Scripts
**Backend:**
    npm start - Inicia el servidor backend.
    npm test - Ejecuta las pruebas backend (si tienes pruebas configuradas).
**Frontend:**
npm start - Inicia el servidor frontend en modo desarrollo.
npm run build - Construye la versión de producción del frontend.
**Despliegue:**
Si deseas desplegar el proyecto, tendrás que configurar el frontend y el backend en el servidor de tu elección (por ejemplo, Heroku, AWS, DigitalOcean, etc.).

Primero, asegúrate de construir el frontend para producción (npm run build).
Luego, despliega el frontend como una aplicación estática y conecta el backend para manejar las API requests.

## Autores
**Elian Condor** 
- https://www.linkedin.com/in/elian-condor-farinango-65125b20a/
- 📧  eliancondor2523658@gmail.com

**Alexis Tenegusnai** 
- 📧  fabro-1999@hotmail.com
- https://www.linkedin.com/in/alexis-tenegus%C3%B1ay-885b5a2a6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app

**Sebastián Tituaña**
- 📧  instoons@hotmail.com
- 




