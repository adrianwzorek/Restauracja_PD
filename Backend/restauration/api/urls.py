from django.urls import path
from .import views

urlpatterns = [
    path('menu/', views.menu),
    path('menu/<int:pk>/', views.menu_detail),
    path('table/',views.table),
    path('table/<int:pk>/',views.table_details),
]
