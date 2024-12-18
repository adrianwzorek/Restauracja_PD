from rest_framework.generics import RetrieveUpdateAPIView, RetrieveAPIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Bill, Guest,BillDish,BillDrink
from .serializers import BillSerializer,BillDishSerializer,BillDrinkSerializer, GuestSerializer
from api.models import Allergen, Menu, Table
from api.serializers import AllergenSerializer, DrinkSerializer, MenuSerializer, DishSerializer, TableSerializer
from rest_framework.pagination import PageNumberPagination
from api.permission import IsGuestOrAuthenticated

class SpecificPaginator(PageNumberPagination):
    page_size = 8
    page_query_param = 'page'
    page_size_query_param = 'page_size'

class HomeFirst(APIView):
    permission_classes = [AllowAny,IsGuestOrAuthenticated ]
    def get(self,request,pk):
        try:
            table = Table.objects.get(id = pk)
            menu = Menu.objects.filter(active = True).first()
            if table and menu:
                serializerMenu = MenuSerializer(menu)
                serializerTable = TableSerializer(table)
                return Response({
                    'dishes': serializerMenu.data.get('dishes',None),
                    'drinks': serializerMenu.data.get('drinks',None),
                    'table': serializerTable.data
                })
        except Table.DoesNotExist:
            return Response({'Error': 'No such table in database'}, status=status.HTTP_400_BAD_REQUEST)
        except Menu.DoesNotExist:
            return Response({'Error': 'No such menu'}, status=status.HTTP_400_BAD_REQUEST)



class Home(APIView):
    permission_classes = [AllowAny,IsGuestOrAuthenticated]

    def get(self, request):
        try:
            menu = Menu.objects.filter(active= True).first()
            serializer = MenuSerializer(menu)
            return Response({
                'dish': serializer.data.get('dishes'),
                'drink': serializer.data.get('drinks')
            }, status=status.HTTP_200_OK)
        except Menu.DoesNotExist:
            return Response({'error':'No Menu in database'}, status=status.HTTP_400_BAD_REQUEST)

class Dishes(APIView):
    permission_classes = [AllowAny,IsGuestOrAuthenticated]
    def get(self,request, *args, **kwargs):
        try:
            menu = Menu.objects.prefetch_related('dishes').get(active = True)
            dishes = menu.dishes.all()
            paginator = SpecificPaginator()
            paginator_data = paginator.paginate_queryset(dishes,request)
            serializer = DishSerializer(paginator_data, many=True)
            response = paginator.get_paginated_response(serializer.data)
            return Response(response.data,status=status.HTTP_200_OK)
        except Menu.DoesNotExist:
            return Response({'error':'No Menu in database'}, status=status.HTTP_400_BAD_REQUEST)

class Drinks(APIView):
    permission_classes = [AllowAny,IsGuestOrAuthenticated]
    
    def get(self,request, *args, **kwargs):
        try:
            menu = Menu.objects.prefetch_related('drinks').get(active = True)
            drink = menu.drinks.all()
            serializer = DrinkSerializer(drink, many=True)
            paginator = SpecificPaginator()
            paginator_data = paginator.paginate_queryset(drink,request)
            serializer = DrinkSerializer(paginator_data, many=True)
            response = paginator.get_paginated_response(serializer.data)
            return Response(response.data,status=status.HTTP_200_OK)
        except Menu.DoesNotExist:
            return Response({'error':'No Menu in database'}, status=status.HTTP_400_BAD_REQUEST)
            

class DishDetails(APIView):
    permission_classes = [AllowAny,IsGuestOrAuthenticated]
    serializer_class = DishSerializer
    def get(self,request, pk):
        try:
            menu = Menu.objects.prefetch_related('dishes').get(active = True)
            query = menu.dishes.get(id=pk)
            serializer = DishSerializer(query)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Menu.DoesNotExist:
            return Response({'error':'No Menu in database'}, status=status.HTTP_400_BAD_REQUEST)


class DrinkDetails(APIView):
    permission_classes = [AllowAny,IsGuestOrAuthenticated]
    def get(self,request,pk):
        try:
            menu = Menu.objects.prefetch_related('drinks').get(active = True)
            query = menu.drinks.get(id=pk)
            serializer = DrinkSerializer(query)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Menu.DoesNotExist:
            return Response({'error':'No Menu in database'}, status=status.HTTP_400_BAD_REQUEST)

class ManageBill(RetrieveUpdateAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    permission_classes = [AllowAny,IsGuestOrAuthenticated]
    
class GetAllergen(RetrieveAPIView):
    queryset = Allergen.objects.all()
    serializer_class = AllergenSerializer
    permission_classes = [AllowAny,IsGuestOrAuthenticated]

class CreateNewGuest(APIView):
    permission_classes = [AllowAny,IsGuestOrAuthenticated]

    def post(self,request, pk):
        try:
            table = Table.objects.get(id=pk)
        except Table.DoesNotExist:
            return Response({'error': 'Table does not exist'}, status=status.HTTP_404_NOT_FOUND)

        guest = Guest.objects.create(table=table)

        return Response({
            'Guest': guest.id,
            'table': guest.table.id,
            'bill': guest.bill.id,
        }, status=status.HTTP_201_CREATED)
    

class GetAllergen(RetrieveAPIView):
    queryset = Allergen.objects.all()
    serializer_class = AllergenSerializer
    permission_classes = [AllowAny,IsGuestOrAuthenticated]

class ManageBillDish(APIView):
    permission_classes = [AllowAny,IsGuestOrAuthenticated]
    
    def get(self, request, pk1,pk2):
        bill_dish = BillDish.objects.get(id_bill=pk1,id_dish=pk2)
        serializer = BillDishSerializer(bill_dish)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk1,pk2):
        try:
            bill_dish = BillDish.objects.get(id_bill=pk1,id_dish=pk2)
        except BillDish.DoesNotExist:
            return Response({'error': 'BillDish not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if request.data.get('isReady'):
            bill_dish.isReady = True
        else:
            bill_dish.isReady = False
        
        serializer = BillDishSerializer(bill_dish, data=request.data, partial=True)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request, pk1, pk2):
        try:
            bill_dish = BillDish.objects.get(id_bill = pk1, id_dish=pk2)
            bill = Bill.objects.get(id = pk1)
            bill_dish.delete()
            bill.calculate_cost()
            bill.save()
            return Response({'info':'Success with delete an item'}, status=status.HTTP_204_NO_CONTENT)
        except Bill.DoesNotExist:
            return Response({'error':'Not Found Bill'}, status=status.HTTP_400_BAD_REQUEST)
        except BillDish.DoesNotExist:
            return Response({'error':'Not Found BillDrink'}, status=status.HTTP_400_BAD_REQUEST)
    


class ManageBillDrink(APIView):
    permission_classes = [AllowAny,IsGuestOrAuthenticated]
    
    def get(self, request, pk1,pk2):
        bill_drink = BillDrink.objects.get(id_bill=pk1,id_drink=pk2)
        serializer = BillDrinkSerializer(bill_drink)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk1,pk2):
        try:
            bill_drink = BillDrink.objects.get(id_bill=pk1,id_drink=pk2)
        except BillDrink.DoesNotExist:
            return Response({'error': 'BillDish not found'}, status=status.HTTP_404_NOT_FOUND)
            
        if request.data.get('isReady'):
            bill_drink.isReady = True
        else:
            bill_drink.isReady = False
            
        serializer = BillDrinkSerializer(bill_drink, data=request.data, partial=True)
            
        if serializer.is_valid():
            print(request.data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request, pk1, pk2):
        try:
            bill_drink = BillDrink.objects.get(id_bill = pk1, id_drink=pk2)
            bill = Bill.objects.get(id = pk1)
            bill_drink.delete()
            bill.calculate_cost()
            bill.save()
            return Response({'info':'Success with delete an item'}, status=status.HTTP_204_NO_CONTENT)
        except Bill.DoesNotExist:
            return Response({'error':'Not Found Bill'}, status=status.HTTP_400_BAD_REQUEST)
        except BillDrink.DoesNotExist:
            return Response({'error':'Not Found BillDrink'}, status=status.HTTP_400_BAD_REQUEST)

    
class AllBillDrink(APIView):
    permission_classes = [AllowAny,IsGuestOrAuthenticated]

    def get(self,request):
        data = BillDrink.objects.all()
        serializer = BillDrinkSerializer(data,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = BillDrinkSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AllBillDish(APIView):
    permission_classes = [AllowAny,IsGuestOrAuthenticated]

    def get(self,request):
        data = BillDish.objects.all()
        serializer = BillDishSerializer(data,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = BillDishSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ManageGuest(APIView):
    permission_classes = [AllowAny,IsGuestOrAuthenticated]
    def get(self,request,pk):
        try:
            data = Guest.objects.get(id = pk)
            serializer = GuestSerializer(data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Guest.DoesNotExist:
            return Response({'error':'Guest does not exist'},status=status.HTTP_400_BAD_REQUEST)
        
    def put(self,request, pk):
        try:
            data = Guest.objects.get(id = pk)
            data.wait = request.data.get('wait')
            data.save()
            serializer = GuestSerializer(data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Guest.DoesNotExist:
            return Response({'error':'Guest does not exist'}, status=status.HTTP_400_BAD_REQUEST)