"""
Definition of forms.
"""

from django import forms

class LoginForm(forms.Form):
    email = forms.CharField(label='email',max_length=254)
    password = forms.CharField(label="password")
