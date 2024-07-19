import boto3
import json
import os

config_file_name = 'config.json'
dot_env_file_name = '.env' 
json_env_file_name = 'local_env.json'
stage = 'local'

config_file_path = os.path.join(os.path.dirname(__file__), '..', config_file_name)
local_env_path = os.path.join(os.path.dirname(__file__), json_env_file_name)

config_data = json.load(open(config_file_path, 'r'))
env_data: dict = json.load(open(local_env_path, 'r'))

aws_region = config_data['stages'][stage]['region']
aws_access_key_id = 'test_id'
aws_secret_access_key = 'test_secret'
project_name = config_data['project_name'] 

session = boto3.Session(
    region_name=aws_region,
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key
)

ssm_client = session.client('ssm', endpoint_url='http://localstack:4566')

for key, value in env_data.items():
    ssm_client.put_parameter(
        Name=f'{project_name}-local-{key}',
        Value=value,
        Type='String',  
        Overwrite=True
    )

print('All variables loaded successfully')