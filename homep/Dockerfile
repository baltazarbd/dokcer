FROM python:3.12.13

# set work directory
WORKDIR /app

# install gunicorn
RUN pip3 install gunicorn

# install dependencies
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# copy project
COPY . .

EXPOSE 8000

CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "mysite.wsgi:application"]
