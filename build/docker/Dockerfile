FROM python:3.11-alpine

ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src

COPY ./build/pip/requirements/compiled/ ../requirements/compiled/
RUN pip install --disable-pip-version-check --no-cache-dir --no-compile \
    -r ../requirements/compiled/local-requirements.txt

COPY ./build/docker/docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

COPY ./api/ ./

EXPOSE 8000 6000

ENTRYPOINT ["/docker-entrypoint.sh"]
