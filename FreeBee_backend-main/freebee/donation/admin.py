from django.contrib import admin

from .models import Donor,Orphanage

admin.site.register(Donor)
admin.site.register(Orphanage)