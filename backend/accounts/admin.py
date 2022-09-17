from django.contrib import admin

from accounts.models import FriendRequest, Friendship, User

# Register your models here.
admin.site.register(User)
admin.site.register(Friendship)
admin.site.register(FriendRequest)
