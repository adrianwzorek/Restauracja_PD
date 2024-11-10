from rest_framework import serializers
from .models import Menu, Table, Waiter, Waiter_has_Table
# Models serializers

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__'

class TableSerializer(serializers.ModelSerializer):
    # Menu_id_menu = serializers.PrimaryKeyRelatedField(queryset=Menu.objects.all())
    class Meta:
        model = Table
        fields = ['id_table', 'Menu_id_menu']

class WaiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Waiter
        fields = ['Id_waiter','Name','Surname','Phone_num','Work_start']
        
    def validate_Phone_num(self,value):
        if len(str(value)) != 9:
            raise serializers.ValidationError('Phone Number must be exactly 9 digits')
        return value

class Waiter_has_tableSerializer(serializers.ModelSerializer):
    class Meta:
        model=  Waiter_has_Table
        fields = '__all__'