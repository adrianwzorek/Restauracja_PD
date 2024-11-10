from rest_framework import generics
from rest_framework import permissions
from .models import Menu, Table, Waiter, Waiter_has_table, Bill, Guest
from .serializers import (
    MenuSerializer, 
    TableSerializer,
    WaiterSerializer,
    Waiter_has_tableSerializer,
    BillSerializer,
    GuestSerializer,

    )
# Create your views here.

class MenuList(generics.ListCreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_classes = [permissions.IsAdminUser]

class MenuDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_classes = [permissions.IsAdminUser]

class TableList(generics.ListCreateAPIView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    permission_classes = [permissions.IsAdminUser]

class TableDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    permission_classes = [permissions.IsAdminUser]

class WaiterList(generics.ListCreateAPIView):
    queryset = Waiter.objects.all()
    serializer_class = WaiterSerializer
    permission_classes = [permissions.IsAdminUser]

class WaiterDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Waiter.objects.all()
    serializer_class = WaiterSerializer
    permission_classes = [permissions.IsAdminUser]

class Waiters_has_tableList(generics.ListCreateAPIView):
    queryset = Waiter_has_table.objects.all()
    serializer_class = Waiter_has_tableSerializer
    permission_classes = [permissions.IsAdminUser]

class Waiter_has_tableDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Waiter_has_table.objects.all()
    serializer_class = Waiter_has_tableSerializer
    permission_classes = [permissions.IsAdminUser]

class BillList(generics.ListCreateAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    permission_classes = [permissions.IsAdminUser]

class BillDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    permission_classes = [permissions.IsAdminUser, permissions.IsAuthenticated]

class GuestList(generics.ListCreateAPIView):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer
    permission_classes = [permissions.IsAdminUser]

class GuestDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer
    permission_classes = [permissions.IsAdminUser, permissions.IsAuthenticatedOrReadOnly]