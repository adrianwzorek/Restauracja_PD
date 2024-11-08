from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Menu, Table, Waiter, Waiter_has_Table, Bill, Guest, Dish, Drink, Bill_has_Dish, Bill_has_Drink
from .serializers import MenuSerializer,TableSerializer,WaiterSerializer, Waiter_has_TableSerializer, BillSerializer, GuestSerializer, DishSerializer,DrinkSerializer, Bill_has_DishSerializer, Bill_has_DrinkSerializer

# Create your views here.

@api_view(['GET','POST'])
def menu(request):
    if request.method == 'GET':
        menus = Menu.objects.all()
        serializer = MenuSerializer(menus, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        serializer = MenuSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
def menu_detail(request,pk):
    try:
        menu = Menu.objects.get(pk=pk)
    except Menu.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = MenuSerializer(menu)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    elif request.method == 'PUT':
        serializer = MenuSerializer(menu, data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        menu.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def dishes(request):
    if request.method == 'GET':
        model = Dish.objects.all()
        serializer = DishSerializer(model, many= True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        pass