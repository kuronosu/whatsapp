from django.urls import path
from rest_framework_simplejwt.views import token_refresh

from . import views

urlpatterns = [
    path('token/', views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', token_refresh, name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('test/', views.testEndPoint, name='test'),
    path('', views.get_routes),
]
