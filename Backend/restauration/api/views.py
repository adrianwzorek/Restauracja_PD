from rest_framework import generics, permissions,status
from rest_framework.response import Response 
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
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
from guest.models import Guest, Bill, BillDish, BillDrink
from guest.serializers import GuestSerializer, BillSerializer, BillDrinkSerializer, BillDishSerializer
from .permission import IsSuperUser
from .authentication import BearerJWTAuthentication
# Create your views here.

class WaiterOrders(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [BearerJWTAuthentication]
    def get(self,request):
        try:
            waiter =  Waiter.objects.get(user = request.user)
            tables = waiter.has_table.all()

            bills = Bill.objects.filter(table__in=tables)
            
            bill_drink = BillDrink.objects.filter(id_bill__in=bills)
            bill_dish = BillDish.objects.filter(id_bill__in=bills)
            
            sWaiter = WaiterSerializer(waiter)            
            sBill = BillSerializer(bills,many=True)
            sBill_drink = BillDrinkSerializer(bill_drink, many=True)
            sBill_dish = BillDishSerializer(bill_dish,many=True)

            return Response( {
                'bills':sBill.data,
                'bill_dishes':sBill_dish.data,
                'bill_drinks':sBill_drink.data,
                'user': sWaiter.data
            },status=status.HTTP_200_OK)
        except Waiter.DoesNotExist:
            return Response({'error':'No such Waiter'}, status=status.HTTP_400_BAD_REQUEST)
        except Table.DoesNotExist:
            return Response({'error':'No such Tables'}, status=status.HTTP_400_BAD_REQUEST)



class Logout(APIView):
    def post(self,request):
        try:
            res = Response({'success':True},status=status.HTTP_200_OK)
            res.delete_cookie('access_token', path='/')
            res.delete_cookie('refresh_token', path='/')
            return res
        except:
            return Response({'success':False},status=status.HTTP_400_BAD_REQUEST)

class CustomRefreshToken(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')

            request.data['refresh'] = refresh_token

            response = super().post(request, *args,**kwargs)

            tokens = response.data
            access_token = tokens['access']

            res = Response({'success':True},status=status.HTTP_200_OK)
            res.set_cookie(
                key='access_token',
                value=access_token,
                path='/'
            )

            return res

        except:
            return Response({'success':False},status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainView(TokenObtainPairView):
    def post(self,request, *args, **kwargs):
        try:
            response = super().post(request,*args, **kwargs)
            tokens = response.data

            access_token = tokens['access']
            refresh_token = tokens['refresh']

            res = Response({'success':True, 'access':access_token, 'refresh':refresh_token}, status=status.HTTP_200_OK)

            return res
        except:

            return Response({'success':False},status=status.HTTP_400_BAD_REQUEST)

class ManageByWaiter(APIView):
    permission_classes =[permissions.IsAuthenticated, IsSuperUser]

    def get(self,request, pk):
        try:
            waiter = Waiter.objects.get(id = pk)
            serializer = WaiterSerializer(waiter)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Waiter.DoesNotExist:
            return Response({'error':'No Such waiter in database'}, status=status.HTTP_400_BAD_REQUEST)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny, IsSuperUser]

class ListAllergens(generics.ListCreateAPIView):
    queryset = Allergen.objects.all()
    serializer_class = AllergenSerializer
    permission_classes = [permissions.IsAdminUser,IsSuperUser]

class AllergenDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Allergen.objects.all()
    serializer_class = AllergenSerializer
    permission_classes = [permissions.IsAuthenticated,IsSuperUser]

class ListDishes(generics.ListCreateAPIView):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    permission_classes = [permissions.IsAuthenticated,IsSuperUser]

class DishDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    permission_classes = [permissions.IsAuthenticated,IsSuperUser]

class ListDrinks(generics.ListCreateAPIView):
    queryset = Drink.objects.all()
    serializer_class = DrinkSerializer
    permission_classes = [permissions.IsAuthenticated,IsSuperUser]

class DrinksDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Drink.objects.all()
    serializer_class = DrinkSerializer
    permission_classes = [permissions.IsAuthenticated,IsSuperUser]

class ListMenu(generics.ListCreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperUser]

class MenuDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperUser]

class ListTable(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self,request):
        try:
            data = Table.objects.all()
            serializer = TableSerializer(data,many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({'something goes wrong'}, status=status.HTTP_400_BAD_REQUEST)    
    def post(self,request):
        if not request.user.is_superuser:
            return Response({'error':'Only for SuperUser can add a table'}, status=status.HTTP_403_FORBIDDEN)
        serializer = TableSerializer(data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TableDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperUser]

class ListWaiter(generics.ListCreateAPIView):
    queryset = Waiter.objects.all()
    serializer_class = WaiterSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperUser]

class WaiterDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Waiter.objects.all()
    serializer_class = WaiterSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperUser]

class ListBill(generics.ListCreateAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperUser]

class BillDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    permission_classes = [permissions.IsAuthenticated]

class ListGuest(generics.ListCreateAPIView):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperUser]

class GuestDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer
    permission_classes = [permissions.IsAuthenticated]

