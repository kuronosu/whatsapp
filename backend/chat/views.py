from typing import Type

from accounts.models import User as _User
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.exceptions import APIException
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Message
from .serializers import MessageSerializer, FriendWithLastMessageSerializer

User: Type[_User] = get_user_model()


class SendMessageView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request: Request, to: int):
        from_user: _User = request.user
        to_user: _User = get_object_or_404(User, pk=to)
        if not from_user.friends.filter(pk=to_user.pk).exists():
            return Response({'message': 'User not in your friends list'}, status=status.HTTP_400_BAD_REQUEST)
        msg = request.data.get('message', '').strip()
        if msg == '':
            return Response({'message': 'Message is empty'}, status=status.HTTP_400_BAD_REQUEST)
        message = Message.objects.create(
            message=msg, sender=from_user, receiver=to_user)
        return Response(MessageSerializer(message).data, status=status.HTTP_201_CREATED)


class MessageListView(generics.ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        from_user: _User = self.request.user
        if from_user.pk == self.kwargs['to']:
            raise APIException('You cannot send messages to yourself')
        to_user: _User = get_object_or_404(User, pk=self.kwargs['to'])
        return Message.users_chat(from_user, to_user)


class FriendsWithLastMessageView(generics.ListAPIView):
    serializer_class = FriendWithLastMessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user: _User = self.request.user
        messages = []
        for other in user.friends.all():
            msg = Message.last_message_between(user, other)
            messages.append({
                'id': msg.pk,
                'username': msg.sender.username if msg.sender.pk != user.pk else msg.receiver.username,
                'lastMessage': msg.message,
                'lastMessageTime': msg.timestamp,
            })
        return messages
