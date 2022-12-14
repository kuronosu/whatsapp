from django.urls import path
from rest_framework_simplejwt.views import token_refresh

from . import views

urlpatterns = [
    path('token/', views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', token_refresh, name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('test/', views.testEndPoint, name='test'),
    path('friends/', views.ListFriendsView.as_view(), name='friends'),
    path('friends/add/', views.SendFriendRequestByUsernameView.as_view(), name='send_friend_request'),
    path('friends/add/users/', views.ListUsersWithoutRelationView.as_view(), name='list_users_without_relation'),
    path('friends/add/<int:pk>/', views.SendFriendRequestView.as_view(), name='send_friend_request'),
    path('friends/request/', views.ListFriendRequestsView.as_view(), name='received_friend_requests'),
    path('friends/request/accept/<int:pk>/', views.AcceptFriendRequestView.as_view(), name='accept_friend_request'),
    path('friends/request/pending/', views.PendingFriendRequestsView.as_view(), name='pending_friend_requests'),
    path('', views.get_routes),
]
