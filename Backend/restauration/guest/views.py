from django.shortcuts import redirect, render
from rest_framework import request
from rest_framework import permissions, status,generics, views
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers import MenuSerializer
# from api.serializers import MenuSerializer
from .serializers import GuestSerializer, BillSerializer
from .models import IsOwnerOfOrder, Bill, Guest
from api.models import Menu
# Create your views here.

def assign_user_to_guest(request):
    if not request.user.is_authenticated:
        return redirect('login')
    guest = Guest.objects.create(user = request.user)
    return redirect('home')

class MainView(generics.ListAPIView):
    queryset = Menu.objects.filter()
    serializer_class = MenuSerializer
    permission_classes = [permissions.AllowAny]

class MenuViewGuest(APIView):
    permission_classes = [permissions.AllowAny]
    def get_object(self,pk):
        try: 
            return Menu.objects.get(pk=pk)
        except Menu.DoesNotExist:
            raise LookupError()
            
    def get(self, request, pk):
        menu = self.get_object(pk)
        serializer = MenuSerializer(menu)
        return Response(serializer.data)
    
    permission_classes = [permissions.AllowAny]


class GuestDetails(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request, pk):
        if not pk:
            return redirect('login')
        
        guest = Guest.objects.get(pk = pk)
        serializer = GuestSerializer(guest)
        return Response(serializer.data)

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
        