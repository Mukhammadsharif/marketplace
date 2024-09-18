from rest_framework import serializers
from .models import Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'name_uz', 'name_ru', 'name_kr', 'sort', 'parent', 'description', 'status', 'image', 'is_parent',]
