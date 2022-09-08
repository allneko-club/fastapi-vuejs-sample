import os
from celery import Celery

celery_broker = os.environ.get('celery_broker', 'amqp://guest@localhost//')

celery_app = Celery('worker', broker=celery_broker)
celery_app.conf.task_routes = {'app.worker.test_celery': 'main-queue'}
