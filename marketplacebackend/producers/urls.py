from django.urls import path
from .views import ProducerListCreateAPIView, ProducerRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('producers/', ProducerListCreateAPIView.as_view(), name='producer-list-create'),
    path('producers/<int:pk>/', ProducerRetrieveUpdateDestroyAPIView.as_view(), name='producer-retrieve-update-destroy'),
]
