from django.http import JsonResponse
from rest_framework.decorators import api_view
from prediction_app.utils.yt_procesor import YtInfo
import os

@api_view(['GET'])
def index(request):
    return JsonResponse({

        "success": True,
        "data": {
            "version": "1.0.0",
            "description": "API para obtener información de un video de YouTube y descargar el audio."
        }

})
@api_view(['GET'])
def predict(request):
    return JsonResponse({
        "success": True,
        "data": {
            "version": "1.0.0",
            "description": "API para obtener información de un video de YouTube y descargar el audio."
        }

})

@api_view(['POST'])
def process_youtube(request):
    try:
        url = request.data.get('url')
        if not url:
            return JsonResponse({
                "error": "URL is required"
            }, status=400)

        # Obtener ID del video
        video_id = YtInfo.get_video_id(url)
        if not video_id:
            return JsonResponse({
                "error": "Invalid YouTube URL"
            }, status=400)

        # Obtener detalles del video
        artist, song_title = YtInfo.get_video_details(video_id)

        # Obtener categoría
        category_id = YtInfo.get_category_id(video_id)
        category_name = YtInfo.get_category_name(category_id, video_id)

        # Obtener letras
        lyrics = YtInfo.get_lyrics_from_musixmatch(artist, song_title)

        # Descargar audio
        audio_path = YtInfo.download_audio_from_youtube(url)

        return JsonResponse({
            "success": True,
            "data": {
                "video_id": video_id,
                "artist": artist,
                "song_title": song_title,
                "category": category_name,
                "lyrics": lyrics,
                "acordes": [
                            # Intro y Verso (Riff Principal)
                            'E3', 'G3', 'A3', 'E3', 'G3', 'B3', 'A3', 'E3', 'G3', 'A3',
                            'E3', 'G3', 'A3', 'E3', 'G3', 'B3', 'A3', 'E3', 'G3', 'A3',

                            # Coro ("Can you help me?")
                            'D3', 'A3', 'G3', 'D3', 'A3', 'G3',
                            'E3', 'G3', 'A3', 'E3', 'G3', 'A3',

                            # Verso (Riff Principal de nuevo)
                            'E3', 'G3', 'A3', 'E3', 'G3', 'B3', 'A3', 'E3', 'G3', 'A3',
                            'E3', 'G3', 'A3', 'E3', 'G3', 'B3', 'A3', 'E3', 'G3', 'A3',

                            # Coro (Repetición)
                            'D3', 'A3', 'G3', 'D3', 'A3', 'G3',
                            'E3', 'G3', 'A3', 'E3', 'G3', 'A3',

                            # Solo de Guitarra (Ritmo sobre estos acordes)
                            'E5', 'D5', 'A5', 'G5', 'E5', 'D5', 'A5', 'G5',
                            'A5', 'D5', 'A5', 'G5', 'E5', 'G5', 'A5', 'E5',

                            # Último Coro
                            'D3', 'A3', 'G3', 'D3', 'A3', 'G3',
                            'E3', 'G3', 'A3', 'E3', 'G3', 'A3',

                            # Outro (Se repite el riff principal y termina abruptamente)
                            'E3', 'G3', 'A3', 'E3', 'G3', 'B3', 'A3',
                            'E3', 'G3', 'A3', 'E3', 'G3', 'A3'
                    ],
                "audio_path": audio_path
            }
        })

    except Exception as e:
        return JsonResponse({
            "error": str(e)
        }, status=500)