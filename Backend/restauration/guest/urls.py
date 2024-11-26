from django.urls import path
from .views import GetBill, CreateNewGuest,Dishes, Drinks, Home
urlpatterns = [
    path('home/<int:pk>/', Home, name='home_table'),
    path('dish/<int:pk>/',Dishes.as_view()),
    path('drink/<int:pk>/', Drinks.as_view()),
    path('bill/<int:pk>/', GetBill.as_view(),name='bill'),
    path('login/<int:id_table>/',CreateNewGuest , name='new_user'),
    path('bill/<int:id_bill>',GetBill.as_view(), name='bill_details'),
]