from rest_framework import serializers
from .models import Product, ProductModel, File, ProductImage
from categories.serializers import CategorySerializer


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'


class ProductModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductModel
        fields = ['name', 'price', 'count', 'available', 'status']


class ProductSerializer(serializers.ModelSerializer):
    model = ProductModelSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    files = FileSerializer(many=True, read_only=True)
    photos = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['name', 'photo', 'description', 'producer', 'model', 'category', 'views', 'title', 'text',
                  'files', 'features', 'photos']

        def to_representation(self, instance):
            data = super().to_representation(instance)
            return data
