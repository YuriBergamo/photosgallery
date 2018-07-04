from django.db import models


class User (models.Model):
    name = models.CharField(max_length=40)
    email = models.CharField(max_length=40)
    password = models.CharField(max_length=30)
    type = models.CharField(max_length=2)


class Like (models.Model):
    photoId = models.CharField()
    like = models.BooleanField(default=0)


class Photo (models.Model):
    userId = models.CharField()
    base64 = models.CharField()
    likes = []




