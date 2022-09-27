from django.contrib.auth import get_user_model
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import (LimitOffsetPagination,
                                       PageNumberPagination)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import \
    TokenObtainPairView as BaseTokenObtainPairView

from .models import FriendRequest
from .serializers import (FriendRequestSerializer, RegisterSerializer,
                          TokenObtainPairSerializer, UserSerializer)

User = get_user_model()


class TokenObtainPairView(BaseTokenObtainPairView):
    serializer_class = TokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def get_routes(request):
    base = request.build_absolute_uri()
    routes = [
        f'{base}token/',
        f'{base}register/',
        f'{base}token/refresh/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)


class ListUsersWithoutRelationView(generics.ListAPIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    """
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        return self.request.user.without_relation()


class ListFriendsView(generics.ListAPIView):
    """
    View to list all friends of the user.

    * Requires token authentication.
    """
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        return self.request.user.friends.all()


class SendFriendRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        to_user = get_object_or_404(User, pk=pk)
        _, created = FriendRequest.objects.get_or_create(
            from_user=request.user, to_user=to_user)
        if not created:
            return Response({'response': 'Friend request already sent'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'response': 'Friend request sent'}, status=status.HTTP_200_OK)


class SendFriendRequestByUsernameView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        username = request.data.get('username')
        if not username:
            return Response({'message': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)
        to_user = get_object_or_404(User, username=username)
        if to_user == request.user:
            raise Http404()
        _, created = FriendRequest.objects.get_or_create(
            from_user=request.user, to_user=to_user)
        if not created:
            return Response({'message': 'Friend request already sent'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Friend request sent'}, status=status.HTTP_200_OK)


class AcceptFriendRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        friend_request = get_object_or_404(
            FriendRequest, pk=pk, accepted=False)
        if friend_request.to_user != request.user:
            return Response({'response': 'You are not authorized to accept this friend request'}, status=status.HTTP_400_BAD_REQUEST)
        friend_request.accepted = True
        friend_request.save()
        request.user.friends.add(friend_request.from_user)
        return Response({'response': 'Friend request accepted'}, status=status.HTTP_200_OK)


class ListFriendRequestsView(generics.ListAPIView):
    """
    View to list all friend requests received by the user.
    """
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        return FriendRequest.objects.filter(to_user=self.request.user, accepted=False)


class PendingFriendRequestsView(generics.ListAPIView):
    """
    View to list all pending friend requests sent by the user.
    """
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        return FriendRequest.objects.filter(from_user=self.request.user, accepted=False)
