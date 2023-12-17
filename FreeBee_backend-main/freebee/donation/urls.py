from django.urls import path

from . import views

urlpatterns = [ 
    path('donor_api/', views.DonorAPI.as_view()),
    path('orphanage_api/', views.OrphanageAPI.as_view()),
    path('external_email_service/', views.external_email_service, name="external_email_service"),
    path('filter_orphanages/', views.filter_orphanages, name="filter_orphanages"),
]