from django.db import models

class Donor(models.Model):
    name = models.TextField()
    address = models.TextField()
    city = models.TextField()
    state = models.TextField()
    pincode = models.TextField()
    mobile_no = models.IntegerField()
    alt_mobile_no = models.IntegerField()
    email=models.EmailField()
    items = models.TextField()
    vehicle_type = models.TextField()
    
class Orphanage(models.Model):
    name = models.TextField()
    address = models.TextField()
    city = models.TextField()
    state = models.TextField()
    pincode = models.TextField()
    mobile_no = models.IntegerField()
    landline_no = models.IntegerField()
    email=models.EmailField()
    homeType=models.TextField()
    image = models.ImageField(upload_to='images') 