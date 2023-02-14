import os
import time
from flask import Flask,request
from flask_cors import CORS,cross_origin
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from flask_apscheduler import APScheduler
from config import mail_settings
from utils.check_result import check_result

# scheduler = BackgroundScheduler()

os.environ["GPU"] = ""
#IST
# os.environ["TZ"] = "Asia/Kolkata"
# time.tzset()

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
    from schedule.schedule import verify_and_run_schedule
    # scheduler.add_job(run_scheduled_tasks, 'interval', seconds=60)
    scheduler = APScheduler()
    scheduler.init_app(app)
    scheduler.add_job(id='job1', func=verify_and_run_schedule, trigger='interval', seconds=60)
    scheduler.start()
    app.run(host='0.0.0.0' , port=5111,debug=False)

