from django.db import models

# Create your models here.
class Restoration(models.Model):
    name = models.CharField(max_length=255, primary_key=True)
    numberOfTables = models.IntegerField(max_length=2)