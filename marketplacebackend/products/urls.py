from django.urls import path
from .views import (ProductListCreateAPIView, ProductRetrieveUpdateDestroyAPIView, ProductModelListCreateAPIView,
                    ProductModelRetrieveUpdateDestroyAPIView)

urlpatterns = [
    path('products/', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductRetrieveUpdateDestroyAPIView.as_view(), name='product-retrieve-update-destroy'),
    path('product-models/', ProductModelListCreateAPIView.as_view(), name='product-model-list-create'),
    path('product-models/<int:pk>/', ProductModelRetrieveUpdateDestroyAPIView.as_view(), name='product-model-retrieve'
                                                                                              '-update-destroy'),
]
