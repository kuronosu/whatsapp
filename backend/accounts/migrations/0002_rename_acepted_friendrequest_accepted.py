# Generated by Django 4.1.1 on 2022-09-17 13:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='friendrequest',
            old_name='acepted',
            new_name='accepted',
        ),
    ]
