from django.urls import path
from .views import (
    ListAllergens,
    AllergenDetails,
    ListDishes,
    DishDetails,
    ListDrinks,
    DrinksDetails,
    ListMenu,
    MenuDetails,
    ListTable,
    TableDetails,
    ListWaiter,
    WaiterDetails,
    ListBill,
    BillDetails,
    ListGuest,
    GuestDetails
    )
urlpatterns = [
    path('allergens/', ListAllergens.as_view()),
    path('allergens/<int:pk>', AllergenDetails.as_view()),
    path('dish/',ListDishes.as_view()),
    path('dish/<int:pk>/', DishDetails.as_view()),
    path('drink/', ListDrinks.as_view()),
    path('drink/<int:pk>/', DrinksDetails.as_view()),
    path('menu/',ListMenu.as_view()),
    path('menu/<int:pk>', MenuDetails.as_view()),
    path('table/',ListTable.as_view()),
    path('table/<int:pk>', TableDetails.as_view()),
    path('waiter/', ListWaiter.as_view()),
    path('waiter/<int:pk>', WaiterDetails.as_view()),
    path('bill/', ListBill.as_view()),
    path('bill/<int:pk>/', BillDetails.as_view()),
    path('guest/', ListGuest.as_view()),
    path('guest/<int:pk>/',GuestDetails.as_view())
]
