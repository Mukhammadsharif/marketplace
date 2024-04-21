from rest_framework import generics
from .models import Producer
from .permissions import IsAuthenticatedOrReadOnly
from .serializers import ProducerSerializer


class ProducerListCreateAPIView(generics.ListCreateAPIView):
    queryset = Producer.objects.all()
    serializer_class = ProducerSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ProducerRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producer.objects.all()
    serializer_class = ProducerSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
