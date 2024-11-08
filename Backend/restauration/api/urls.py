from rest_framework.routers import DefaultRouter
from django.urls import path
from .import views
# from .views import ShowMenu, ShowTable, ShowWaiter,ShowWaiter_has_Table, ShowBill, ShowGuest, ShowDish,ShowDrink, ShowBill_has_Dish,ShowBill_has_Drink

urlpatterns = [
    path('menu/', views.menu),
    path('menu/<int:pk>', views.menu_detail),
    path('dish/', views.dishes)
]
