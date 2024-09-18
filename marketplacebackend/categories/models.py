from django.db import models
from ckeditor.fields import RichTextField


class Category(models.Model):
    name = models.CharField(max_length=255)
    name_uz = models.CharField(max_length=255)
    name_ru = models.CharField(max_length=255, blank=True, null=True)
    name_kr = models.CharField(max_length=255, blank=True, null=True)
    sort = models.IntegerField(default=0)
    parent = models.ForeignKey('self', blank=True, null=True, related_name='children', on_delete=models.CASCADE)
    description = RichTextField()
    status = models.BooleanField(default=True)
    is_parent = models.BooleanField(default=False)
    image = models.ImageField(upload_to='categories', blank=True, null=True)

    def __str__(self):
        return self.name
