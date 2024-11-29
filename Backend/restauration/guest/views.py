from rest_framework.generics import RetrieveUpdateAPIView, RetrieveAPIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Bill, Guest
from .serializers import BillSerializer
from api.models import Allergen, Menu, Table
from api.serializers import AllergenSerializer, DrinkSerializer, MenuSerializer, DishSerializer
from rest_framework.pagination import PageNumberPagination

class SpecificPaginator(PageNumberPagination):
    page_size = 1
    page_query_param = 'page'
    page_size_query_param = 'page_size'

class HomeFirst(APIView):
    permission_classes = [AllowAny]
    def get(self,request,pk):
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
        

class Dishes(APIView):
    permission_classes = [AllowAny]
    def get(self,request, *args, **kwargs):
        menu = Menu.objects.prefetch_related('dishes').get(active = True)
        dishes = menu.dishes.all()
        paginator = SpecificPaginator()
        paginator_data = paginator.paginate_queryset(dishes,request)
        serializer = DishSerializer(paginator_data, many=True)
        response = paginator.get_paginated_response(serializer.data)
        return Response(response.data,status=status.HTTP_200_OK)

class Drinks(APIView):
    permission_classes = [AllowAny]
    
    def get(self,request, *args, **kwargs):
        menu = Menu.objects.prefetch_related('drinks').get(active = True)
        drink = menu.drinks.all()
        serializer = DrinkSerializer(drink, many=True)
        paginator = SpecificPaginator()
        paginator_data = paginator.paginate_queryset(drink,request)
        serializer = DrinkSerializer(paginator_data, many=True)
        response = paginator.get_paginated_response(serializer.data)
        return Response(response.data,status=status.HTTP_200_OK)

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

class CreateNewGuest(APIView):
    permission_classes = [AllowAny]

    def put(self,request, pk):
        try:
            table = Table.objects.get(id_table=pk)
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