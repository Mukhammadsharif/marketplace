from rest_framework import serializers
from .models import Product, ProductModel


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'photo', 'description', 'producer', 'model', 'category', 'views', 'title', 'text',
                  'files', 'images', 'features']


class ProductModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductModel
        fields = ['name', 'price', 'count', 'available', 'status']

