from rest_framework import serializers
from .models import Menu, Table
# Models serializers

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__'

class TableSerializer(serializers.ModelSerializer):
    Menu_id_menu = serializers.PrimaryKeyRelatedField(queryset=Menu.objects.all())
    class Meta:
        model = Table
        fields = ['id_table', 'Menu_id_menu']

