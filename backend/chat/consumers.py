from channels.generic.websocket import AsyncJsonWebsocketConsumer

class MessagesConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        if not self.user or not self.user.is_authenticated:
            return await self.close()
        self.room_group_name = 'user_messages_%d' % self.user.id
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
