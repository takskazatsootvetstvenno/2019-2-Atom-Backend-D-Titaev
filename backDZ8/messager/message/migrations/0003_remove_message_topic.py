# Generated by Django 2.2.6 on 2019-11-23 13:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0002_auto_20191123_1228'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='topic',
        ),
    ]