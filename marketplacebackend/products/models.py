import os

from ckeditor.fields import RichTextField
from django.db import models
from categories.models import Category


def file_upload_path(instance, filename):
    # Define the directory structure where files will be stored
    return os.path.join('uploads', str(instance.id), filename)


class File(models.Model):
    # File metadata
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to=file_upload_path)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='products', blank=True, null=True)
    description = RichTextField(blank=True, null=True)
    producer = models.CharField(max_length=255, blank=True, null=True)
    model = models.ForeignKey('ProductModel', blank=True, null=True, related_name='products', on_delete=models.CASCADE)
    category = models.ForeignKey(Category, blank=True, null=True, on_delete=models.CASCADE)
    views = models.PositiveIntegerField(default=0)
    title = models.CharField(max_length=255, blank=True, null=True)
    text = models.CharField(max_length=255, blank=True, null=True)
    files = models.ManyToManyField(File, related_name='images', blank=True, null=True)
    images = models.ManyToManyField(File, related_name='files', blank=True, null=True)
    features = RichTextField(blank=True, null=True)

    def __str__(self):
        return self.name


class ProductModel(models.Model):
    name = models.CharField(max_length=255)
    price = models.CharField(max_length=20)
    count = models.IntegerField(default=1)
    available = models.BooleanField(default=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name
