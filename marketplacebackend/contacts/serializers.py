from rest_framework import serializers
from .models import Contact, Social


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['name', 'contact', 'status']


class SocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Social
        fields = ['name', 'contact', 'status']
