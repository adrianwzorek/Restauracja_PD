from django.urls import path
from .views import GetBill, CreateNewGuest,Dishes, Drinks, Home, DrinkDetails, DishDetails
urlpatterns = [
    path('home/<int:pk>/', Home, name='home_table'),
    path('home/dish/',Dishes),
    path('home/dish/<int:pk>/',DishDetails.as_view()),
    path('home/drink/', Drinks),
    path('home/drink/<int:pk>/',DrinkDetails.as_view()),
    path('bill/<int:pk>/', GetBill.as_view(),name='bill'),
    path('login/<int:id_table>/',CreateNewGuest , name='new_user'),
    path('bill/<int:id_bill>',GetBill.as_view(), name='bill_details'),
]