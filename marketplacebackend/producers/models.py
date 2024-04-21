from django.db import models


class Producer(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='producers')
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name
