FROM nexus.fbsvc.bz/stcit_docker/python:3.9.13

# set work directory
WORKDIR /app

# install dependencies
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# install submodule dependencies
COPY lib/requirements.txt lib/requirements.txt
RUN pip3 install -r /app/lib/requirements.txt

# install gunicorn
RUN pip3 install gunicorn

# copy project
COPY . .

EXPOSE 8000

CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "mysite.wsgi:application"]
