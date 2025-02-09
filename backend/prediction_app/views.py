from django.http import JsonResponse
# Create your views here.

from django.shortcuts import render


def index(request):
    return JsonResponse({'message': 'Hello, world!'})


def predict(request):
    return JsonResponse({'message': 'Hello, world!'})