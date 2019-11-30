DEBUG = True

try:
 from .Local_password import *
except ImportError:
 pass

# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases
DATABASES = {
     'default': {
         'ENGINE': 'django.db.backends.postgresql_psycopg2',
         'NAME': 'backendbase',
         'USER': 'backenduser',
         'PASSWORD': LOCAL_PASSWORD,
         'HOST': '127.0.0.1',
         'PORT': '5432',
     }
}
