from django.urls import path
from .views import Home,GetBill, CreateNewGuest
urlpatterns = [
    path('home/',Home.as_view(), name='main_view'),
    path('bill/<int:pk>/', GetBill.as_view(),name='bill'),
    path('login/<int:id_table>/',CreateNewGuest , name='new_user'),
    path('bill/<int:id_bill>',GetBill.as_view(), name='bill_details')
]