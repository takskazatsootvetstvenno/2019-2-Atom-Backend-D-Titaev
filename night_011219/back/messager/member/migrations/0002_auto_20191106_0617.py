# Generated by Django 2.2.6 on 2019-11-06 06:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('message', '0001_initial'),
        ('member', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='last_read_messages',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='message.message'),
        ),
        migrations.AddField(
            model_name='member',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
