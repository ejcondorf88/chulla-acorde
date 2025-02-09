from googleapiclient.discovery import build
import yt_dlp as youtube_dl
from urllib.parse import urlparse, parse_qs
import time
import  requests
import librosa
import os
class YtInfo:
    API_KEY_YOUTUBE = 'AIzaSyDaV_lDk1t8cMvjWZBwIcr-mcTrKBtWjuE'

    @staticmethod
    def get_instance_yt(API_KEY_YOUTUBE='AIzaSyDaV_lDk1t8cMvjWZBwIcr-mcTrKBtWjuE'):
        youtube = build('youtube', 'v3', developerKey=API_KEY_YOUTUBE)
        return youtube

    @staticmethod
    def get_video_id(url):
        parsed_url = urlparse(url)
        video_id = parse_qs(parsed_url.query).get('v')
        if video_id:
            return video_id[0]
        return None

    @staticmethod
    def get_category_id(video_id):

        if video_id:
            request = YtInfo.get_instance_yt().videos().list(
                part='snippet',
                id=video_id
            )
            response = request.execute()

            video_category_id = response['items'][0]['snippet']['categoryId']
            return video_category_id

    @staticmethod
    def get_category_name(category_id, video_id):

        if video_id:
            if category_id:
                request = YtInfo.get_instance_yt().videoCategories().list(
                    part='snippet',
                    id=category_id  # Elimina regionCode
                )
                response = request.execute()

                category_name = response['items'][0]['snippet']['title']
                return category_name

            else:
                return None

    @staticmethod
    def get_lyrics_from_musixmatch(artist, song_title, api_key='cfedd47e33aca6c86e6d9d4fe3d53ed6'):
        base_url = 'https://api.musixmatch.com/ws/1.1/'
        search_url = f'{base_url}matcher.lyrics.get'

        params = {
            'apikey': api_key,
            'q_track': song_title,
            'q_artist': artist
        }

        response = requests.get(search_url, params=params)
        response.raise_for_status()
        data = response.json()

        try:
            lyrics = data['message']['body']['lyrics']['lyrics_body']
            return lyrics
        except KeyError:
            return 'Lyrics not found.'

    @staticmethod
    def get_video_details(video_id, youtube_api_key=API_KEY_YOUTUBE, ):
        youtube = build('youtube', 'v3', developerKey=youtube_api_key)
        request = youtube.videos().list(part='snippet', id=video_id)
        response = request.execute()
        title = response['items'][0]['snippet']['title']
        description = response['items'][0]['snippet']['description']

        # Extraer el nombre del artista del título o descripción
        # Aquí se asume que el título está en el formato "Artista - Título"
        title_parts = title.split('-')
        artist = title_parts[0].strip() if len(title_parts) > 1 else 'Desconocido'
        song_title = title_parts[1].strip() if len(title_parts) > 1 else title.strip()

        return artist, song_title

    @staticmethod
    def download_audio_from_youtube(youtube_url):
        # Obtener la ruta del directorio actual
        current_directory = os.path.dirname(__file__)

        # Establecer un nombre de archivo fijo para sobrescribir
        output_filename = "audio"
        output_path = os.path.join(current_directory, output_filename)

        ydl_opts = {
            'format': 'bestaudio/best',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'wav',
                'preferredquality': '192',
            }],
            'outtmpl': output_path,
            'quiet': True,
        }

        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([youtube_url])

        time.sleep(15)

        return output_path+'.wav'


