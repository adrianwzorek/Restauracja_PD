from django.shortcuts import render
from rest_framework import viewsets
from .models import Menu, Table, Waiter, Waiter_has_Table, Bill, Guest, Dish, Drink, Bill_has_Dish, Bill_has_Drink
from .serializers import MenuSerializer,TableSerializer,WaiterSerializer, Waiter_has_TableSerializer, BillSerializer, GuestSerializer, DishSerializer,DrinkSerializer, Bill_has_DishSerializer, Bill_has_DrinkSerializer

# Create your views here.

class ShowMenu(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

class ShowTable(viewsets.ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer

class ShowWaiter(viewsets.ModelViewSet):
    queryset = Waiter.objects.all()
    serializer_class = WaiterSerializer

class ShowWaiter_has_Table(viewsets.ModelViewSet):
    queryset = Waiter_has_Table.objects.all()
    serializer_class = Waiter_has_TableSerializer

class ShowGuest(viewsets.ModelViewSet):
    queryset = Guest
    serializer_class = GuestSerializer

class ShowDish(viewsets.ModelViewSet):
    queryset = Dish 
    serializer_class = DishSerializer

class ShowDrink(viewsets.ModelViewSet):
    queryset = Drink
    serializer_class = DrinkSerializer

class ShowBill(viewsets.ModelViewSet):
    queryset = Bill
    serializer_class = BillSerializer

class ShowBill_has_Dish(viewsets.ModelViewSet):
    queryset = Bill_has_Dish
    serializer_class = Bill_has_DishSerializer

class ShowBill_has_Drink(viewsets.ModelViewSet):
    queryset = Bill_has_Drink
    serializer_class = Bill_has_DrinkSerializer