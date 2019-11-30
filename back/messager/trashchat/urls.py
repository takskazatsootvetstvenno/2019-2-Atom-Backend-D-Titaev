from .views import send_message,messages_list,new_messages
from django.urls import path

urlpatterns = [
 path('send_message', send_message, name='chats'),
 path('messages_list', messages_list, name='chats'),
 path('new_messages', new_messages, name='chats'),
]
