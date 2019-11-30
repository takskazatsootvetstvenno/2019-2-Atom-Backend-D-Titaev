from .views import create_chat, member_list
from django.urls import path

urlpatterns = [
 path('', create_chat, name='chats'),
 path('member_list', member_list, name='chats'),
]
