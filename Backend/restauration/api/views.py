from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Menu, Table
from .serializers import MenuSerializer, TableSerializer
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

@api_view(['GET',"POST"])
def table(request):
    if request.method == 'GET':
        model = Table.objects.all()
        serializer = TableSerializer(model, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        serializer = TableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET','PUT','DELETE'])
def table_details(request,pk):
    try:
        table = Table.objects.get(pk=pk)
    except Menu.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = TableSerializer(table)
        return Response(serializer.data, status=status.HTTP_200_OK)
        # ZMIANA NIE DZIAŁA, DODAJE ZAMIAST EDYTOWAĆ
    if request.method == 'PUT':
        serializer = TableSerializer(table,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'DELETE':
        table.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        