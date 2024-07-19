#!/bin/sh

# migrate always
python manage.py migrate

# disable frozen modules for debugpy compatibility with Python 3.11+ 
exec python -Xfrozen_modules=off manage.py runserver 0.0.0.0:8000
