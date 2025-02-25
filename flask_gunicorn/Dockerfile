FROM python:3.8-slim

# args for nexus extra-index-url
ARG NEXUS_USERNAME
ARG NEXUS_PASSWORD

# set work directory
WORKDIR /app

# install psycopg2, ldap and other dependencies
RUN apt update && apt install  gcc python3-dev musl-dev build-essential openldap libffi-dev -y 

# install dependencies
COPY requirements.txt .
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt --extra-index-url https://$NEXUS_USERNAME:$NEXUS_PASSWORD@nexus.fbsvc.bz/repository/stcitdev_python/simple/