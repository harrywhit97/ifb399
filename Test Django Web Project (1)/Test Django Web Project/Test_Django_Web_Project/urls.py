"""
Definition of urls for Test_Django_Web_Project.
"""

from datetime import datetime
from django.conf.urls import url
import django.contrib.auth.views

import app.forms
import app.views
import app.AAA_module


urlpatterns = [
    url(r'^index_employee$', app.views.employeeHome, name='employeeHome'),
    url(r'^index_admin$', app.views.adminHome, name='adminHome'),
    url(r'^faq$', app.views.faqpage, name='faqpage'),
    url(r'^login$', app.views.login.get, name='login'),
    url(r'^$', app.views.login.get, name='loginDefault'),
    url(r'^AAA$', app.views.login.post, name='AAA')
]
