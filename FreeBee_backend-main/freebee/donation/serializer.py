from rest_framework import serializers
from .models import *

class OrphanageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orphanage
        fields = "__all__"