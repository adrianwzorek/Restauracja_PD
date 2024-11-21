from rest_framework.generics import ListAPIView
from rest_framework import permissions
from api.models import Menu
from api.serializers import MenuSerializer

class Home(ListAPIView):
    queryset = Menu.objects.filter(active = True)
    serializer_class = MenuSerializer
    permission_classes = [permissions.AllowAny]