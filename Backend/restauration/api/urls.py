from django.urls import path
from .import views

urlpatterns = [
    path('menu/', views.MenuList.as_view()),
    path('menu/<int:pk>/', views.MenuDetails.as_view()),
    path('table/',views.TableList.as_view()),
    path('table/<int:pk>/',views.TableDetails.as_view()),
    path('waiter/', views.WaiterList.as_view()),
    path('waiter/<int:pk>', views.WaiterDetails.as_view()),
    path('waiterTable/', views.Waiters_has_tableList.as_view()),
    path('waiterTable/<int:pk>', views.Waiter_has_tableDetails.as_view()),
    path('bill/', views.BillList.as_view()),
    path('bill/<int:pk>', views.BillDetails.as_view()),
    path('guest/', views.GuestList.as_view()),
    path('guest/<int:pk>', views.GuestDetails.as_view())
]
