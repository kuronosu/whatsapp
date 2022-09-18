from rest_framework import serializers

from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'


class FriendWithLastMessageSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    lastMessage = serializers.CharField()
    lastMessageTime = serializers.DateTimeField()
