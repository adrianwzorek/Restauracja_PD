from rest_framework.generics import RetrieveUpdateAPIView, RetrieveAPIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .models import Bill, Guest
from .serializers import BillSerializer
from api.models import Menu, Table
from api.serializers import DrinkSerializer, MenuSerializer, DishSerializer

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def Home(request, pk):
    menu = Menu.objects.filter(active = True).first()
    serializer = MenuSerializer(menu)
    return Response({
        'dishes': serializer.data.get('dishes',None),
        'drinks': serializer.data.get('drinks',None),
        'table': pk
    })
    

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def Dishes(request):
        
        menu = Menu.objects.prefetch_related('dishes').get(active = True)
        dishes = menu.dishes.all()
        serializer = DishSerializer(dishes, many=True)
        return Response({
            'dishes': serializer.data
        },status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def Drinks(request):
        
        menu = Menu.objects.prefetch_related('dishes').get(active = True)
        drink = menu.drinks.all()
        serializer = DrinkSerializer(drink, many=True)
        return Response({
            'drink': serializer.data
        },status=status.HTTP_200_OK)


class DishDetails(RetrieveAPIView):
    menu = Menu.objects.prefetch_related('dishes').get(active = True)
    queryset = menu.dishes.all()
    serializer_class = DishSerializer
    permission_classes = [permissions.AllowAny]

class DrinkDetails(RetrieveAPIView):
    menu = Menu.objects.prefetch_related('drinks').get(active = True)
    queryset = menu.drinks.all()
    serializer_class = DrinkSerializer
    permission_classes = [permissions.AllowAny]

class GetBill(RetrieveUpdateAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    permission_classes = [permissions.AllowAny]

@api_view(['PUT'])
@permission_classes([permissions.AllowAny])
def CreateNewGuest(request,id_table):
    try:
        table = Table.objects.get(id_table=id_table)
    except Table.DoesNotExist:
        return Response({'error': 'Table does not exist'}, status=status.HTTP_404_NOT_FOUND)

    guest = Guest.objects.create(table=table)
    return Response({
        'Guest': guest.id_guest,
        'table': guest.table.id_table,
        'bill': guest.bill.id_bill,
    }, status=status.HTTP_201_CREATED)
    

