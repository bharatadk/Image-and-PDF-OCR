import uuid
from flask import current_app, jsonify
from models.task_model import save_task_to_database
import os
import logging
from datetime import datetime

logger = logging.getLogger(__name__)


def pdf_formatted_controller(request):
    try:
        filenames = []
        if not os.path.exists(current_app.config["UPLOAD_FOLDER"]):
            os.makedirs(current_app.config["UPLOAD_FOLDER"])
        email = request.form.get("user_email")
        date = request.form.get("date")
        time = request.form.get("time")
        logger.info(f"Image PDF from {email} @ {date} {time}")
        if not len(request.files) > 0:
            return "No any files uploaded"
        pdf_file = request.files.get("file0")
        filename = f"{uuid.uuid4()}.pdf"
        filenames.append(filename)
        pdf_file.save(os.path.join(current_app.config["UPLOAD_FOLDER"], filename))
        task_id = save_task_to_database(email, date, time, filenames, "pdf")

        filenames = []
        data = {
            "text": f"task-id :  {task_id} \n Thanks, you will receive the text later in : {email} at: {date} {time}. Your task_id is {task_id}  and is registered on : {datetime.now()} ",
            "isOver5": "no",
            "task": task_id,
        }
        return jsonify(data)

    except Exception as e:
        print("error:", e)
        return "error in  pdf-ocr"


# def pdfUpload():
#     try:
#         filenames = []
#         if not os.path.exists(UPLOAD_FOLDER):
#             os.makedirs(UPLOAD_FOLDER)
#         filenames = []
#         logger.info("welcome to upload`")
#         all_text=[]

#         if(len(request.files)>0):
#             all_image_list=[]
#             pdf_file = request.files.get("file0")
#             filename =f"{uuid.uuid4()}.pdf"
#             pdf_file.save(os.path.join(app.config['UPLOAD_FOLDER'],filename ))
#             time.sleep(1)
#             all_image_list,isOver5 = pdf_reader(os.path.join(app.config['UPLOAD_FOLDER'],filename ))

#             for filename in all_image_list:

#                 this_text =ocr_reader(filename)
#                 time.sleep(1)
#                 all_text.extend(this_text)
#         filenames=[]
#         data={
#             "text":"\n".join(all_text),
#             "isOver5":isOver5
#         }
#         return jsonify(data)

#     except Exception as e:
#         print("error:",e)
#         return "error in processing pdf-ocr"
