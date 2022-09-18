from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

# Create your models here.


class Message(models.Model):
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='message_sender')
    receiver = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='message_receiver')

    class Meta:
        constraints = [
            # constraints ensure that a user can't send a message to himself
            models.CheckConstraint(check=~models.Q(
                sender=models.F('receiver')), name='sender_ne_receiver'),
        ]

    def __str__(self):
        return f'from {self.sender} to {self.receiver} => {self.message}'

    @classmethod
    def users_chat(cls, user, other_user):
        return cls.objects\
            .filter(
                (models.Q(sender=user) & models.Q(receiver=other_user)) |
                (models.Q(sender=other_user) & models.Q(receiver=user))
            )\
            .select_related('sender', 'receiver')\
            .order_by('-timestamp')

    @classmethod
    def last_message_between(cls, user, other_user):
        return cls.users_chat(user, other_user).first()
