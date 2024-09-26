from django.db import models


class Contact(models.Model):
    TYPE_CHOICES = (
        ('phone', 'Phone'),
        ('telegram', 'Telegram'),
        ('mail', 'Mail'),
        ('address', 'Address'),
    )
    name = models.CharField(max_length=100, choices=TYPE_CHOICES)
    contact = models.CharField()
    contact_uz = models.CharField(max_length=255, blank=True, null=True)
    contact_ru = models.CharField(max_length=255, blank=True, null=True)
    contact_kr = models.CharField(max_length=255, blank=True, null=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Social(models.Model):
    TYPE_CHOICES = (
        ('facebook', 'Facebook'),
        ('instagram', 'Instagram'),
        ('youtube', 'Youtube'),
        ('telegram', 'Telegram'),
    )
    name = models.CharField(max_length=100, choices=TYPE_CHOICES)
    contact = models.CharField()
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name
