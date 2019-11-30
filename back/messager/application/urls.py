"""messager URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('chats/', include('dialog.urls')),
    path('users/', include('user.urls')),
    path('message/', include('message.urls')),
    path('attachment/', include('attachment.urls')),
    path('trashchat/', include('trashchat.urls')),
    #path('chat_profile/', include('chat_profile.urls')),
    #path('chat_page/', include('chat_page.urls')),
    #path('chat_list/', include('chat_list.urls')),
    #path('chat_contacts/', include('chat_contacts.urls')),
    path('', include('main.urls')),
]