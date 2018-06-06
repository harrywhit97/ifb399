"""
Definition of views.
"""

from django.shortcuts import render
from django.http import HttpRequest
from django.template import RequestContext
from datetime import datetime
from django.contrib.auth.models import User
from .forms import LoginForm
from .AAA_module import * 


#template name
template = 'app/logintest.html'

def employeeHome(request):
    """Renders the home page."""
   # assert isinstance(request, HttpRequest)
    
    if userHasBeenCleared(request):
       
        return render(
            request,
            'app/index_employee.html',
            {
                'title':'Home Page',
                'year':datetime.now().year,
                'email':getEmailSessionVar(request),
                'isAdmin':isAdmin(request),                
            }
        )
    return login(request)

def adminHome(request):
    """Renders the home page."""
   # assert isinstance(request, HttpRequest)
    
    if userHasBeenCleared(request):
       
        return render(
            request,
            'app/index_admin.html',
            {
                'title':'Home Page',
                'year':datetime.now().year,
                'email':getEmailSessionVar(request),
                'isAdmin':isAdmin(request),                
            }
        )
    return login(request)

def faqpage(request):
        return render(
            request,
            'app/faq.html')


class login():


    #display form
    def get(request):        
        assert isinstance(request, HttpRequest)
        return render(
            request,
            'app/login.html',
            {
                'title':'Login',
                'message':'Your application Login page.',
                'year':datetime.now().year,
            }
        )

    def post(request):
        if request.method == 'POST':
            
            form = LoginForm(request.POST)
            
            if authenticate(request):
                request = setEmailSessionVar(request)                
                isAdmin = authorize(request)
                request = setAdminSessionVar(request, isAdmin)
                
                if isAdmin:
                    return adminHome(request)
                return employeeHome(request)
            
        return login()


