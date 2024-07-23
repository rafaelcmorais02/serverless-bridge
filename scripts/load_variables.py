import json
import os

import boto3

DEPLOY_CONFIG_FILE_NAME = '../deploy-config.json'
JSON_ENV_FILE_NAME = '../api/local/local_env.json'
STAGE = 'local'

deploy_config_file_path = os.path.join(
    os.path.dirname(__file__), DEPLOY_CONFIG_FILE_NAME)
local_env_path = os.path.join(os.path.dirname(__file__), JSON_ENV_FILE_NAME)

deploy_config_data = json.load(open(deploy_config_file_path, 'r'))
env_data: dict = json.load(open(local_env_path, 'r'))

aws_region = deploy_config_data['stages'][STAGE]['region']
aws_access_key_id = 'test_id'
aws_secret_access_key = 'test_secret'
project_name = deploy_config_data['projectName']

session = boto3.Session(
    region_name=aws_region,
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key
)

ssm_client = session.client('ssm', endpoint_url='http://localhost:4566')

for key, value in env_data.items():
    ssm_client.put_parameter(
        Name=f'{project_name}-{STAGE}-{key}',
        Value=value,
        Type='String',
        Overwrite=True
    )

print('All variables loaded successfully')
