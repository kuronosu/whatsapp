FROM python:3.10.7
ENV PYTHONUNBUFFERED 1
RUN mkdir -p /app/api
WORKDIR /app/api
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . /app/api
EXPOSE 8000
