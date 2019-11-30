from .views import upload_file, download_file
from django.urls import path

urlpatterns = [
 path('upload_file', upload_file, name='message'),
 path('download_file', download_file, name='message'),
]
