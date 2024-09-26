from django.db import models


class Order(models.Model):
    name = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    phone = models.CharField(max_length=25)
    email = models.EmailField(blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    order_text = models.TextField()
    sum = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name
