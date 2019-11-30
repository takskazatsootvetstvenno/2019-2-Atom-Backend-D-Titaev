from main.views import main_response
from django.urls import path
urlpatterns = [
 path('', main_response, name='main_response'),
]
