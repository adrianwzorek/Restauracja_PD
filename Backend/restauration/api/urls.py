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
    GuestDetails,
    CreateUserView
    )
urlpatterns = [
    path('register/',CreateUserView.as_view(), name='register_waiter'),
    path('allergen/', ListAllergens.as_view(),name='all_allergens'),
    path('allergen/<int:pk>/', AllergenDetails.as_view(), name='allergen_details'),
    path('dish/', ListDishes.as_view(), name='all_dishes'),
    path('dish/<int:pk>/', DishDetails.as_view(), name='dish_details'),
    path('drink/', ListDrinks.as_view(), name='all_drinks'),
    path('drink/<int:pk>/',DrinksDetails.as_view(),name='drink_details'),
    path('menu/',ListMenu.as_view(), name='all_menus'),
    path('menu/<int:pk>/',MenuDetails.as_view(), name='menu_details'),
    path('table/', ListTable.as_view(), name='all_tables'),
    path('table/<int:pk>/', TableDetails.as_view(), name='table_details'),
    path('waiter/', ListWaiter.as_view(), name='all_waiters'),
    path('waiter/<int:pk>/', WaiterDetails.as_view(), name='waiter_details'),
    path('bill/',ListBill.as_view(), name='all_bills'),
    path('bill/<int:pk>/',BillDetails.as_view(), name='bill_details'),
    path('guest/', ListGuest.as_view(), name='all_guest'),
    path('guest/<int:pk>/', GuestDetails.as_view(),name='guest_details'),
] 