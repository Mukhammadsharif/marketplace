from django.contrib import admin

from products.models import File
from products.models import Product
from products.models import ProductModel

# Register your models here.
admin.site.register(Product)
admin.site.register(ProductModel)
admin.site.register(File)
