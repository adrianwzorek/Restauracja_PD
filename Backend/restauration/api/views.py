from rest_framework import generics
from rest_framework import permissions
from django.contrib.auth.models import User
from .serializers import (
    UserSerializer,
    AllergenSerializer,
    DishSerializer, 
    DrinkSerializer,
    MenuSerializer,
    TableSerializer,
    WaiterSerializer,
    )
from .models import Allergen, Dish, Drink,Menu, Table, Waiter
from guest.models import Guest, Bill
from guest.serializers import GuestSerializer, BillSerializer


# Create your views here.


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class ListAllergens(generics.ListCreateAPIView):
    queryset = Allergen.objects.all()
    serializer_class = AllergenSerializer
    permission_classes = [permissions.IsAdminUser]

class AllergenDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Allergen.objects.all()
    serializer_class = AllergenSerializer
    permission_classes = [permissions.IsAdminUser]

class ListDishes(generics.ListCreateAPIView):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    permission_classes = [permissions.IsAdminUser]

class DishDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    permission_classes = [permissions.IsAdminUser]

class ListDrinks(generics.ListCreateAPIView):
    queryset = Drink.objects.all()
    serializer_class = DrinkSerializer
    permission_classes = [permissions.IsAdminUser]

class DrinksDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Drink.objects.all()
    serializer_class = DrinkSerializer
    permission_classes = [permissions.IsAdminUser]

class ListMenu(generics.ListCreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_classes = [permissions.IsAdminUser]

class MenuDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_classes = [permissions.IsAdminUser]

class ListTable(generics.ListCreateAPIView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    permission_classes = [permissions.IsAdminUser]

class TableDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    permission_classes = [permissions.IsAdminUser]

class ListWaiter(generics.ListCreateAPIView):
    queryset = Waiter.objects.all()
    serializer_class = WaiterSerializer
    permission_classes = [permissions.IsAdminUser]

class WaiterDetails(generics.ListCreateAPIView):
    queryset = Waiter.objects.all()
    serializer_class = WaiterSerializer
    permission_classes = [permissions.IsAdminUser]

class ListBill(generics.ListCreateAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    permission_classes = [permissions.IsAdminUser]

class BillDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    permission_classes = [permissions.IsAdminUser]

class ListGuest(generics.ListCreateAPIView):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer
    permission_classes = [permissions.IsAdminUser]

class GuestDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer
    permission_classes = [permissions.IsAdminUser]

