from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    friends = models.ManyToManyField('self', blank=True, through='Friendship')

    def __str__(self):
        return self.username

    def without_relation(self):
        return User.objects\
            .exclude(from_user__in=FriendRequest.objects.filter(to_user=self))\
            .exclude(to_user__in=FriendRequest.objects.filter(from_user=self))\
            .exclude(pk=self.pk)\
            .exclude(pk__in=self.friends.all())
    
    def friend_requests_to(self, acepted=False):
        return User.objects.filter(to_user__in=FriendRequest.objects.filter(from_user=self, acepted=acepted))

    def friend_requests_from(self, acepted=False):
        return User.objects.filter(from_user__in=FriendRequest.objects.filter(to_user=self, acepted=acepted))


class Friendship(models.Model):
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='friendship_sender')
    reciver = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['sender', 'reciver'], name='unique_friendship'),
            models.CheckConstraint(
                check=~models.Q(sender=models.F('reciver')),
                name='no_self_friendship',
            ),
        ]


class FriendRequest(models.Model):
    from_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='from_user')
    to_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='to_user')
    timestamp = models.DateTimeField(auto_now_add=True)
    accepted = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.from_user} to {self.to_user} at {self.timestamp}'

    class Meta:
        ordering = ['-timestamp']
        constraints = [
            models.UniqueConstraint(
                fields=['from_user', 'to_user'], name='unique_friend_request'),
            models.CheckConstraint(
                name='from_user_not_equal_to_user',
                check=~models.Q(from_user=models.F('to_user'))
            ),
        ]
