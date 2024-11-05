from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ShowMenu, ShowTable, ShowWaiter,ShowWaiter_has_Table, ShowBill, ShowGuest, ShowDish,ShowDrink, ShowBill_has_Dish,ShowBill_has_Drink

router = DefaultRouter()
router.register(r'menu', ShowMenu)
router.register(r'table', ShowTable)
router.register(r'waiter', ShowWaiter)
router.register(r'waiter_has_table', ShowWaiter_has_Table)
router.register(r'guest',ShowGuest)
router.register(r'bill', ShowBill)
router.register(r'dish', ShowDish)
router.register(r'drink',ShowDrink)
router.register(r'bill_has_dish', ShowBill_has_Dish)
router.register(r'bill_has_drink', ShowBill_has_Drink)

urlpatterns = [
    path('', include(router.urls))
]