from django.urls import path
from .views import MenuViewGuest,GuestDetails, MainView, assign_user_to_guest

urlpatterns = [
    path('home/',MainView.as_view(), name='main_view'),
]