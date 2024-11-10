from django.urls import path
from .import views

urlpatterns = [
    path('menu/', views.MenuList.as_view()),
    path('menu/<int:pk>/', views.MenuDetails.as_view()),
    path('table/',views.TableList.as_view()),
    path('table/<int:pk>/',views.TableDetails.as_view()),
]
