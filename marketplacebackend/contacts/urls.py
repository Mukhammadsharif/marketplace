from django.urls import path
from .views import ContactListCreateAPIView, ContactRetrieveUpdateDestroyAPIView, SocialListCreateAPIView, SocialRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('contacts/', ContactListCreateAPIView.as_view(), name='contact-list-create'),
    path('contacts/<int:pk>/', ContactRetrieveUpdateDestroyAPIView.as_view(), name='contact-retrieve-update-destroy'),
    path('socials/', SocialListCreateAPIView.as_view(), name='social-list-create'),
    path('socials/<int:pk>/', SocialRetrieveUpdateDestroyAPIView.as_view(), name='social-retrieve-update-destroy'),
]
