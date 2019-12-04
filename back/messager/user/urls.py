from .views import user, finduser, allinformation
from django.urls import path

urlpatterns = [
 path('find_name_user', user, name='users'),
 path('find_user', finduser, name='users'),
 path('', allinformation, name='users'),
]
