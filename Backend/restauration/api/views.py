from rest_framework import generics, status
from rest_framework import permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import (
    UserSerializer,
    AllergenSerializer, 
    DishSerializer, 
    DrinkSerializer,
    MenuSerializer,
    TableSerializer,
    WaiterSerializer,
    BillSerializer,
    GuestSerializer
    )
from .models import Allergen, Dish, Drink, IsOwnerOfOrder,Menu, Table, Waiter, Bill, Guest



# Create your views here.

class Home(generics.ListAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_classes = [permissions.AllowAny]

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
    permission_classes = [permissions.AllowAny]

class DrinksDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Drink.objects.all()
    serializer_class = DrinkSerializer
    permission_classes = [permissions.AllowAny]

class ListMenu(generics.ListCreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_classes = [permissions.IsAdminUser]

class MenuDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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

class BillViewSet(generics.RetrieveUpdateAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    permission_classes = [IsOwnerOfOrder]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        partial = kwargs.pop('partial',False)
        serializer = self.get_serializer(instance, data = request.data, partial = partial)
        serializer.is_valid(raise_exception=True)
        # Get The dishes and drinks
        dishes = request.data.get('dishes',[])
        drinks = request.data.get('drinks',[])

        # Adding to the Bill
        if dishes:
            instance.dishes.add(*dishes)
        if drinks:
            instance.drinks.add(*drinks)

        # Calculate full cost of Bill
        instance.full_cost = (
            sum(d.cost for d in instance.dishes.all())+
            sum(d.cost for d in instance.drinks.all())
        )
        instance.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
        