from rest_framework.generics import RetrieveUpdateAPIView, RetrieveAPIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.views import APIView
from .models import Bill, Guest
from .serializers import BillSerializer
from api.models import Allergen, Dish, Menu, Table
from api.serializers import AllergenSerializer, DrinkSerializer, MenuSerializer, DishSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def HomeFirst(request, pk):
    menu = Menu.objects.filter(active = True).first()
    serializer = MenuSerializer(menu)
    return Response({
        'dishes': serializer.data.get('dishes',None),
        'drinks': serializer.data.get('drinks',None),
        'table': pk
    })

class Home(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        menu = Menu.objects.filter(active= True).first()
        serializer = MenuSerializer(menu)
        return Response({
            'dish': serializer.data.get('dishes'),
            'drink': serializer.data.get('drinks')
        }, status=status.HTTP_200_OK)
        

@api_view(['GET'])
@permission_classes([AllowAny])
def Dishes(request):
        menu = Menu.objects.prefetch_related('dishes').get(active = True)
        dishes = menu.dishes.all()
        serializer = DishSerializer(dishes, many=True, context={'request':request})
        return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def Drinks(request):
        menu = Menu.objects.prefetch_related('dishes').get(active = True)
        drink = menu.drinks.all()
        serializer = DrinkSerializer(drink, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class DishDetails(RetrieveAPIView):
    menu = Menu.objects.prefetch_related('dishes').get(active = True)
    queryset = menu.dishes.all()
    serializer_class = DishSerializer
    permission_classes = [AllowAny]

class DrinkDetails(RetrieveAPIView):
    menu = Menu.objects.prefetch_related('drinks').get(active = True)
    queryset = menu.drinks.all()
    serializer_class = DrinkSerializer
    permission_classes = [AllowAny]

class GetBill(RetrieveUpdateAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    permission_classes = [AllowAny]

class GetAllergen(RetrieveAPIView):
    queryset = Allergen.objects.all()
    serializer_class = AllergenSerializer
    permission_classes = [AllowAny]

@api_view(['PUT'])
@permission_classes([AllowAny])
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
    


class GetAllergen(RetrieveAPIView):
    queryset = Allergen.objects.all()
    serializer_class = AllergenSerializer
    permission_classes = [AllowAny]