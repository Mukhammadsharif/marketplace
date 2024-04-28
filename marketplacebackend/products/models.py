import os

from ckeditor.fields import RichTextField
from django.db import models
from categories.models import Category


def file_upload_path(instance, filename):
    # Define the directory structure where files will be stored
    return os.path.join('uploads', str(instance.id), filename)


class ProductImage(models.Model):
    product = models.ForeignKey('Product', related_name='photos', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_images')
    caption = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.caption if self.caption else f"Image for Product {self.product.id}"


class File(models.Model):
    # File metadata
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='files')

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='products', blank=True, null=True)
    description = RichTextField(blank=True, null=True)
    producer = models.CharField(max_length=255, blank=True, null=True)
    category = models.ForeignKey(Category, blank=True, null=True, on_delete=models.CASCADE)
    views = models.PositiveIntegerField(default=0)
    features = RichTextField(blank=True, null=True)

    def __str__(self):
        return self.name


class ProductModel(models.Model):
    name = models.CharField(max_length=255)
    price = models.CharField(max_length=20)
    count = models.IntegerField(default=1)
    available = models.BooleanField(default=True)
    status = models.BooleanField(default=True)
    product = models.ForeignKey('Product', related_name='models', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
