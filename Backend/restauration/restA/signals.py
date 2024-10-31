from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Restoration, Table
# @receiver(post_save, sender=Restoration)
# def create_tables(sender, instance, created,**kwarg):