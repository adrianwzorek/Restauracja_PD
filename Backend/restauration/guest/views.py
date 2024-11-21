from rest_framework.generics import ListAPIView
from api.models import Menu
from api.serializers import MenuSerializer

class Home(ListAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer