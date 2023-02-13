import os
from flask import Flask,request
from flask_cors import CORS,cross_origin
import logging
import uuid
from flask import jsonify
from easyapp import ocr_reader
from pdftoOCR import pdf_reader,pdf_reader_formatted
import time
from datetime import datetime,timedelta
from tasks import extract_data_from_image
from apscheduler.schedulers.background import BackgroundScheduler
import pytz
from mail_sender import mail_sender
from flask_mail import Mail

scheduler = BackgroundScheduler()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("HELLO WORLD")


#Set the TZ environment variable to the Indian timezone

# Disable local
#os.environ["TZ"] = "Asia/Kolkata"
#time.tzset()

# Set the timezone using pytz
india = pytz.timezone('Asia/Kolkata')




app = Flask(__name__)
cors= CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


#SMTP
mail = Mail(app) # instantiate the mail class

mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 587,
    "MAIL_USE_TLS": True,
    "MAIL_USE_SSL": False,
    "MAIL_USERNAME": 'bharatadhikari7243@gmail.com',
    "MAIL_PASSWORD": 'elpoegymgpqoeyuy',
}

app.config.update(mail_settings)
mail = Mail(app)

UPLOAD_FOLDER = os.path.join(os.getcwd(),"uploads")
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
@cross_origin()
def getTime():
    return str(datetime.now())

@app.route("/uploadImage",methods=['POST'])
@cross_origin()
def fileUpload():
    try:
        filenames = []
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)

        logger.info("welcome to upload`")
        all_text=[]

        user_email = request.form.get('user_email')
        print("#"*20)
        print('user_email',user_email)
        timestamp = float(request.form.get("date_set_by_user"))/1000
        #timestamp = india.normalize(timestamp.astimezone(india))

        print("js",timestamp)
        print("py",datetime.now().timestamp())

        print(datetime.fromtimestamp(timestamp))
        scheduled_time =datetime.fromtimestamp(timestamp) +timedelta(seconds=60)
        print("#"*20)


        if(len(request.files)>0):
            for image_name in request.files.keys():

                image = request.files.get(image_name)
                filename=f"{uuid.uuid4()}.png"
                filenames.append(filename)
                print("😂",scheduled_time)
                image.save(os.path.join(app.config['UPLOAD_FOLDER'],filename ))
                time.sleep(1)
                if datetime.strptime(str(scheduled_time), '%Y-%m-%d %H:%M:%S')< datetime.now():
                    print("<< Here")
                    # scheduled_time = datetime.strptime((datetime.now() +timedelta(seconds=30)).strftime("%Y-%m-%d %H:%M:%S"), '%Y-%m-%d %H:%M:%S')
                    extract_data_from_image(filename,mail_sender,mail,user_email,app)
                else:

                    #print("🖼",(datetime.now() +timedelta(seconds=60)).strftime("%Y-%m-%d %H:%M:%S"))
                    # Convert the date and time string to a datetime object
                    #scheduled_time = datetime.strptime((scheduled_time +timedelta(seconds=30)).strftime("%Y-%m-%d %H:%M:%S"), '%Y-%m-%d %H:%M:%S')
                    scheduled_time = datetime.strptime(scheduled_time.strftime("%Y-%m-%d %H:%M:%S"), '%Y-%m-%d %H:%M:%S')  + timedelta(seconds=30)

                    # Schedule the extraction task to run only once at the specified time
                    scheduler.add_job(extract_data_from_image, 'date', run_date=scheduled_time, args=[filename,mail_sender,mail,user_email,app])


                #this_text =ocr_reader(filename)
                #all_text.extend(this_text)
        filenames=[]
        data={
            "text":f"Thanks, you will receive the text later in : {user_email} {scheduled_time} {datetime.now()}",
            "isOver5":"no"
        }
        return jsonify(data)


    except Exception as e:
        print("error:",e)
        return "error in processing img-ocr"


@app.route("/uploadPdf",methods=['POST'])
@cross_origin()
def pdfUpload():
    try:
        filenames = []
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)
        filenames = []
        logger.info("welcome to upload`")
        all_text=[]

        if(len(request.files)>0):
            all_image_list=[]
            pdf_file = request.files.get("file0")
            filename =f"{uuid.uuid4()}.pdf"
            pdf_file.save(os.path.join(app.config['UPLOAD_FOLDER'],filename ))
            time.sleep(1)
            all_image_list,isOver5 = pdf_reader(os.path.join(app.config['UPLOAD_FOLDER'],filename ))

            for filename in all_image_list:

                this_text =ocr_reader(filename)
                time.sleep(1)
                all_text.extend(this_text)
        filenames=[]
        data={
            "text":"\n".join(all_text),
            "isOver5":isOver5
        }
        return jsonify(data)

    except Exception as e:
        print("error:",e)
        return "error in processing pdf-ocr"



@app.route("/uploadPdfFormatted",methods=['POST'])
@cross_origin()
def pdfUploadFormatted():
    try:
        filenames = []
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)
        filenames = []
        logger.info("welcome to upload`")
        all_text=[]

        if(len(request.files)>0):
            all_image_list=[]
            pdf_file = request.files.get("file0")
            filename =f"{uuid.uuid4()}.pdf"
            pdf_file.save(os.path.join(app.config['UPLOAD_FOLDER'],filename ))
            time.sleep(1)
            all_image_list,isOver5 = pdf_reader_formatted(os.path.join(app.config['UPLOAD_FOLDER'],filename ))

        filenames=[]
        data={
            "text":all_image_list,
            "isOver5":isOver5
        }
        return jsonify(data)

    except Exception as e:
        print("error:",e)
        return "error in processing pdf-ocr"




if __name__ == "__main__":
    scheduler.start()
    app.run(debug=True)


