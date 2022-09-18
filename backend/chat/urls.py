from django.urls import path

from . import views

urlpatterns = [
    path('send/<int:to>', views.SendMessageView.as_view(), name='send_message'),
    path('list/<int:to>', views.MessageListView.as_view(), name='message_list'),
]
