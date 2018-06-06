from django.http import HttpRequest
from django.template import RequestContext
from django.contrib.auth.models import User
import re



def getEmailSessionVar(request):
    """
    Gets the logged in users email from the session variables

    @param
    request

    @return
    the value of the 'email' session value or None if it has not been set
    """
    
    if 'email' in request.session:
        return request.session['email']
    return None

def setEmailSessionVar(request):
    """
    This method pulls the inputed email from the form
    then sets it to a sessiom variable called 'email'

    @param
    request

    @return
    updated request with set session variable
    """
    

    request.session['email'] = request.POST.get("email", "")
    return request

def setAdminSessionVar(request, isAdmin):
    """
    This method sets a sessiom variable called 'usAdmin'
    to the boolean inputted parameter 'isAdmin'

    @param
    request
    isAdmin, true if the user is an administrator flase if otherwise

    @return
    updated request with set session variable
    """
    
    request.session['isAdmin'] = isAdmin
    return request

def isAdmin(request):
    """
    This method checks the session variable 'isAdmin' to see
    if the logged in user is an administrator

    @param
    request

    @return
    true if the 'isAdmin' session variable is true and false if not
    if the session variable has not been set it raises a value error
    """
    
    if 'isAdmin' in request.session:
        return request.session['isAdmin']
    raise ValueError('There is no session variable of this name')



def authenticate(request):
    """
    
    """
    
    # TODO : update with SAML validation
    
    
    return True
    
#Returns true if the user is an admin false if otherwise
def authorize(request):
    """
    This method checks the users email which is stored in the
    session variable 'email' and tests it against a list of
    approved admin email strings. If the users email
    contains of of these string then true will be returned

    @param
    request

    @return
    true the users email contains a approved admin string
    false if otherwise
    """
    
    userEmail = getEmailSessionVar(request)
    adminEmailPatterns = ["agency99"]
    
    for pattern in adminEmailPatterns:
        
        match = re.search(pattern, userEmail)

    if match:
        return True    
    return False


def userHasBeenCleared(request):
    if getEmailSessionVar(request) != None:
        return True
    return False

def clearSessionVars(request):
    request.session['email'] = None
    request.session['isAdmin'] = None
