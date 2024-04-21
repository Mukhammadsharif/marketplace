from rest_framework import generics
from .models import Product, ProductModel
from .permissions import IsAuthenticatedOrReadOnly
from .serializers import ProductSerializer, ProductModelSerializer


class ProductListCreateAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ProductRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ProductModelListCreateAPIView(generics.ListCreateAPIView):
    queryset = ProductModel.objects.all()
    serializer_class = ProductModelSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ProductModelRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductModel.objects.all()
    serializer_class = ProductModelSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
