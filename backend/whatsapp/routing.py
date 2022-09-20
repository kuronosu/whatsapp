from django.urls import path
from chat.consumers import MessagesConsumer

websocket_urlpatterns = [
    path('ws/messages/', MessagesConsumer.as_asgi()),
]
