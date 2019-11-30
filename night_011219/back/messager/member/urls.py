from .views import members
from django.urls import path

urlpatterns = [
 path('members', members, name='member'),
]
