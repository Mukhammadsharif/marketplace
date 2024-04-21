from rest_framework import generics
from .models import Contact, Social
from .permissions import IsAuthenticatedOrReadOnly
from .serializers import ContactSerializer, SocialSerializer


class ContactListCreateAPIView(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ContactRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class SocialListCreateAPIView(generics.ListCreateAPIView):
    queryset = Social.objects.all()
    serializer_class = SocialSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class SocialRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Social.objects.all()
    serializer_class = SocialSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
