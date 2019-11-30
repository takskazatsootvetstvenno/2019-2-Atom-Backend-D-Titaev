# Generated by Django 2.2.6 on 2019-11-06 05:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('dialog', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='attachment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attype', models.CharField(max_length=64)),
                ('url', models.CharField(max_length=64)),
                ('new_messages', models.TextField()),
                ('chat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dialog.dialog')),
            ],
        ),
    ]
