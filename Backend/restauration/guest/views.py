from rest_framework.generics import ListAPIView,RetrieveUpdateAPIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .models import Bill, Guest
from .serializers import BillSerializer
from api.models import Menu, Table
from api.serializers import MenuSerializer

class Home(ListAPIView):
    queryset = Menu.objects.filter(active = True)
    serializer_class = MenuSerializer
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
    

