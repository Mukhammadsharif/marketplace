# Generated by Django 5.0.4 on 2024-04-20 09:27

import ckeditor.fields
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('name_uz', models.CharField(max_length=255)),
                ('name_ru', models.CharField(blank=True, max_length=255, null=True)),
                ('name_kr', models.CharField(blank=True, max_length=255, null=True)),
                ('sort', models.IntegerField(default=0)),
                ('description', ckeditor.fields.RichTextField()),
                ('status', models.BooleanField(default=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='categories')),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='categories.category')),
            ],
        ),
    ]