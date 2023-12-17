from django.db import models


class Users(models.Model):
    username = models.TextField()
    email = models.EmailField()
    password = models.TextField()
    is_donor =models.BooleanField()
    is_orphanage=models.BooleanField()

    