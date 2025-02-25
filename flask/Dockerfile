FROM nexus.fbsvc.bz/stcit_docker/python:3.9.13

# set work directory
WORKDIR /app

# install dependencies
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# install submodule dependencies
COPY lib/requirements.txt lib/requirements.txt
RUN pip3 install -r /app/lib/requirements.txt


# copy project
COPY . .

# Application
ENV FLASK_APP app.py
ENV FLASK_ENV development
ENV FLASK_RUN_PORT 8000
ENV FLASK_RUN_HOST 0.0.0.0

EXPOSE 8000

CMD ["flask", "run"]