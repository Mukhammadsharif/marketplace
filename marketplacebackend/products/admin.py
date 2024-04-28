from django.contrib import admin

from products.models import File
from products.models import Product
from products.models import ProductModel

from products.models import ProductImage


class ProductImageInline(admin.StackedInline):
    model = ProductImage
    extra = 1  # Specifies the number of extra forms in the formset.


class ProductModelInline(admin.StackedInline):
    model = ProductModel
    extra = 1  # Specifies the number of extra forms in the formset.


class ProductAdmin(admin.ModelAdmin):
    inlines = [
        ProductImageInline,
        ProductModelInline,
    ]


# Register your models here.
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage)
admin.site.register(ProductModel)
admin.site.register(File)
