from .views import user, finduser
from django.urls import path

urlpatterns = [
 path('find_name_user', user, name='users'),
 path('find_user', finduser, name='users'),
]
