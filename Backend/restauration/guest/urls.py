from django.urls import path
from .views import ManageBill, CreateNewGuest,Dishes, Drinks, HomeFirst ,Home, DrinkDetails, DishDetails, GetAllergen,ManageBillDish,ManageBillDrink,AllBillDish,AllBillDrink
urlpatterns = [
    path('home/', Home.as_view(), name='home_table'),
    path('home/<int:pk>/', HomeFirst.as_view(), name='home_table'),
    path('home/dish/',Dishes.as_view()),
    path('home/dish/<int:pk>/',DishDetails.as_view(),name='dish'),
    path('home/dish/allergen/<int:pk>/', GetAllergen.as_view(), name='allergens'),
    path('home/drink/', Drinks.as_view()),
    path('home/drink/<int:pk>/',DrinkDetails.as_view(), name='drink'),
    path('bill/<int:pk>/', ManageBill.as_view(),name='bill'),
    path('bill_dish/', AllBillDish.as_view(),name='all_bill_dish'),
    path('bill_drink/', AllBillDrink.as_view(),name='all_bill_drink'),
    path('bill_dish/<int:pk1>/', ManageBillDish.as_view(), name='bill_dish'),
    path('bill_dish/<int:pk1>/<int:pk2>/', ManageBillDish.as_view(), name='bill_dish'),
    path('bill_drink/<int:pk1>/', ManageBillDrink.as_view(), name='bill_drink'),
    path('bill_drink/<int:pk1>/<int:pk2>/', ManageBillDrink.as_view(), name='bill_drink'),
    path('login/<int:pk>/',CreateNewGuest.as_view() , name='new_user'),
]