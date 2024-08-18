FROM python:3.11-alpine as api

ENV PYTHONUNBUFFERED 1

RUN apk add --no-cache \
    build-base \
    postgresql-dev \
    libffi-dev \
    jpeg-dev \
    zlib-dev \
    ca-certificates \
    && apk add --no-cache --virtual .build-deps gcc musl-dev linux-headers \
    && pip install --upgrade pip \
    && apk del .build-deps

WORKDIR /usr/src

COPY ./api/config/requirements/compiled/ ../requirements/compiled/
RUN pip install --disable-pip-version-check --no-cache-dir --no-compile \
    -r ../requirements/compiled/docker-requirements.txt

COPY ./docker/backend-entrypoint.sh /
RUN chmod +x /backend-entrypoint.sh

COPY ./api/ ./

EXPOSE 8000 6000

ENTRYPOINT ["/backend-entrypoint.sh"]