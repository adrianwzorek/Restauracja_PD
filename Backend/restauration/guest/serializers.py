from .models import Guest, Bill
from api.models import Dish, Drink
from rest_framework import serializers
    
class BillSerializer(serializers.ModelSerializer):
    dishes = serializers.PrimaryKeyRelatedField(
        queryset = Dish.objects.all(),
        many = True,
        required = False
    )
    drinks = serializers.PrimaryKeyRelatedField(
        queryset = Drink.objects.all(),
        many = True,
        required = False
    )
    class Meta:
        model = Bill
        fields = ['id_bill', 'table', 'full_cost', 'date', 'dishes', 'drinks']

    def update(self, instance, validated_data):
        dishes = validated_data.pop('dishes',[])
        drinks = validated_data.pop('drinks', [])
        instance.dishes.add(*dishes)
        instance.drinks.add(*drinks)
        instance.full_cost = sum(d.cost for d in instance.dishes.all()) + sum(d.cost for d in instance.drinks.all())
        instance.save()
        return instance


class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = '__all__'
        read_only_fields = ['user']