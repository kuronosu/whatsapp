from django.urls import path
from chat.consumers import MessagesConsumer

websocket_urlpatterns = [
    path('messages/', MessagesConsumer.as_asgi()),
]
