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
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    models = ProductModelSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True)
    photos = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'name_uz', 'name_ru', 'name_kr', 'photo',
                  'description_ru', 'description_uz', 'description_kr', 'producer', 'category', 'views',
                  'features', 'photos', 'models']

        def to_representation(self, instance):
            data = super().to_representation(instance)
            return data
