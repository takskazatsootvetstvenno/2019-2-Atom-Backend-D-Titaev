from .views import read_message, send_message, readed_message, send_message, chat_messages
from django.urls import path

urlpatterns = [
 path('read_message', read_message, name='message'),
 path('readed_message', readed_message, name='message'),
 path('send_message', send_message, name='message'),
 path('chat_messages', chat_messages, name='message'),
]
