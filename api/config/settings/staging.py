import os

from config.settings.base import *

DEBUG = True

ALLOWED_HOSTS = ['xdedmud0ka.execute-api.sa-east-1.amazonaws.com']

STORAGES = {
    "default": {
        "BACKEND": "storages.backends.s3boto3.S3Boto3Storage",
    },
    "staticfiles": {
        "BACKEND": "storages.backends.s3boto3.S3Boto3Storage",
    },
}

AWS_STORAGE_BUCKET_NAME = os.environ.get("STATIC_FILES_BUCKET_NAME")
AWS_S3_REGION_NAME = os.environ.get("STATIC_FILES_BUCKET_REGION")
AWS_QUERYSTRING_AUTH = False
