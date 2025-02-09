
from django.urls import path
from . import views

urlpatterns = [
    path('predict', views.predict, name='predict'),
    path('process_youtube', views.process_youtube, name='process_youtube'),
]