import os
import time
from flask import Flask,request
from flask_cors import CORS,cross_origin
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.schedulers.blocking import BlockingScheduler
from config import mail_settings
from utils.check_result import check_result
from multiprocessing import Process

# scheduler = BlockingScheduler()
# scheduler.configure({'apscheduler.daemon': False})
os.environ["GPU"] = ""
os.environ["TZ"] = "Asia/Kolkata"
time.tzset()

# Blueprints
from routes.image_route import image_bp
from routes.pdf_route import pdf_bp

app = Flask(__name__)
cors= CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#Register blueprints
app.register_blueprint(image_bp,url_prefix="/api/v1/upload")
app.register_blueprint(pdf_bp,url_prefix="/api/v1/upload")

#SMTP: mail = Mail(app) # instantiate the mail class
app.config.update(mail_settings)
# mail = Mail(app)

UPLOAD_FOLDER = os.path.join(os.getcwd(),"uploads")
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route("/")
def getTime():
    return str(datetime.now())

@app.route("/task/<int:id>")
def getText(id):
    return check_result(request,id)



if __name__ == "__main__":
    from schedule.schedule import run_scheduled_tasks
    # scheduler.add_job(run_scheduled_tasks, 'interval', seconds=60)
    @app.before_first_request
    def setup_scheduler():
        scheduler = BackgroundScheduler()
        scheduler.add_job(run_scheduled_tasks,'interval', seconds=60)
        scheduler.start()
    p = Process(target=app.run)
    p.start()
    # app.run(debug=True)
