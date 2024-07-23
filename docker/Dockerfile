FROM python:3.11-alpine as api

ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src

COPY ./api/config/requirements/compiled/ ../requirements/compiled/
RUN pip install --disable-pip-version-check --no-cache-dir --no-compile \
    -r ../requirements/compiled/local-requirements.txt

COPY ./docker/backend-entrypoint.sh /
RUN chmod +x /backend-entrypoint.sh

COPY ./api/ ./

EXPOSE 8000 6000

ENTRYPOINT ["/backend-entrypoint.sh"]