FROM python:3.11-alpine as api

ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src

COPY ./build/pip/requirements/compiled/ ../requirements/compiled/
RUN pip install --disable-pip-version-check --no-cache-dir --no-compile \
    -r ../requirements/compiled/local-requirements.txt

COPY ./build/docker/backend-entrypoint.sh /
RUN chmod +x /backend-entrypoint.sh

COPY ./api/ ./

EXPOSE 8000 6000

ENTRYPOINT ["/backend-entrypoint.sh"]


FROM python:3.11-alpine as local_setup

ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN pip install boto3==1.33.9

COPY .api/local/local_env.json ./build/docker/load_variables.py config.json ./app/
