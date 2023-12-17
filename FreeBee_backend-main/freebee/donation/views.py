from django.core.mail import EmailMessage
# from .serilalizers import * 
from .templates import * 
from .serializer import * 
# import json, os
from django.core.mail import EmailMessage
from .models import *
from django.http import FileResponse, HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import date,datetime

class DonorAPI(APIView):
    def get(self,request):
        pass
    
    
    def post(self,request):
        name = request.data['name']
        address = request.data['address']
        city = request.data['city']
        state = request.data['state']
        pincode = request.data['pincode']
        mobile_no = request.data['mobile_no']
        alt_mobile_no = request.data['alt_mobile_no']
        email=request.data['email']
        items=request.data['items']
        vehicle_type=request.data['vehicle_type']
        objects= Donor(
                    name= name,
                    address=address,
                    city=city,
                    state=state,
                    pincode=pincode,
                    mobile_no=mobile_no,
                    alt_mobile_no=alt_mobile_no,
                    email=email,
                    items=items,
                    vehicle_type=vehicle_type,
                )
        objects.save()
        return Response({
            "status" : "success",
            "statusResponse":"Added Successfully"
        }) 
class OrphanageAPI(APIView):
    def get(self,request):
        all_orphanage=Orphanage.objects.all()
        serializer=OrphanageSerializer(all_orphanage,many=True)
        return Response({
            "status" : "success",
            "statusResponse":"Fetched Successfully",
            "data":serializer.data
        })
        # for orphanage in all_orphanage:
        #     name=orphanage.name
        #     email=orphanage.email
        #     mobile_no=orphanage.mobile_no
        #     # image=orphanage.image
        #     return Response({
        #     "status" : "success",
        #     "statusResponse":"Added Successfully",
        #     "data":{
        #             "orphanage_name":name,
        #             "orphanage_email":email,
        #             "orphanage_mobile":mobile_no,
        #             # "orphanage_image": image,
        #         },
        # })
    
    
    def post(self,request):
        name = request.data['name']
        address = request.data['address']
        city = request.data['city']
        state = request.data['state']
        pincode = request.data['pincode']
        mobile_no = request.data['mobile_no']
        landline_no = request.data['landline_no']
        email=request.data['email']
        image=request.data['image']
        homeType=request.data['homeType']
        objects= Orphanage(
                    name= name,
                    address=address,
                    city=city,
                    state=state,
                    pincode=pincode,
                    mobile_no=mobile_no,
                    landline_no=landline_no,
                    email=email,
                    image=image,
                    homeType=homeType,
                )
        objects.save()
        return Response({
            "status" : "success",
            "statusResponse":"Added Successfully",
        })
        

def notify_user(to, cc, subject, body, bcc): 
    email = EmailMessage(subject, body, bcc=bcc, to=to, cc=cc) 
    email.content_subtype = "html" 
    email.send() 
    print("Mail Triggred")
@api_view(['GET', 'POST']) 
def external_email_service(request): 
    name = request.data['name']
    address = request.data['address']
    city = request.data['city']
    state = request.data['state']
    pincode = request.data['pincode']
    mobileno = request.data['mobile_no']
    altmobileno = request.data['alt_mobile_no']
    email=request.data['email'],
    items = request.data['items']
    vehicles = request.data['vehicle_type']
    orphanage_email=request.data['orphanage_email']
    table_rows=""
    
    table_rows += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(name,address,city,state,pincode,mobileno,altmobileno,email,items,vehicles)

    # notify_user(to=to, cc=cc, subject=subject, body=content, bcc=bcc) 
    notify_user(to=[orphanage_email],cc=["komel7420@gmail.com"],
                    subject="Free bee donation",
                    body=DONOR_REPORT.format(name, table_rows),
                    bcc=[]
                )
    return Response({"status": "success"}) 


@api_view([ 'POST']) 
def filter_orphanages(request):
    pincode=request.data['pincode']
    homeType=request.data['homeType']
    objects = Orphanage.objects.filter(pincode=pincode,homeType=homeType)
    serializer=OrphanageSerializer(objects,many=True)
    return Response({
        "status" : "success",
        "statusResponse":"Fetched Successfully",
        "data":serializer.data
    })