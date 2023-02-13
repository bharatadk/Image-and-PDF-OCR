import uuid
from flask import current_app, jsonify
from models.task_model import save_task_to_database
import os
import logging
from datetime import datetime

logger = logging.getLogger(__name__)


def image_controller(request):
    try:
        filenames = []
        if not os.path.exists(current_app.config["UPLOAD_FOLDER"]):
            os.makedirs(current_app.config["UPLOAD_FOLDER"])
        email = request.form.get("user_email")
        date = request.form.get("date")
        time = request.form.get("time")
        logger.info(f"Image Uploading from {email} @ {date} {time}")
        print(email, time, date)
        if not len(request.files) > 0:
            return "No any files uploaded"

        for image_name in request.files.keys():
            image = request.files.get(image_name)
            filename = f"{uuid.uuid4()}.png"
            filenames.append(filename)
            image.save(os.path.join(current_app.config["UPLOAD_FOLDER"], filename))

        task_id = save_task_to_database(email, date, time, filenames, "img")

        filenames = []
        data = {
            "text": f"task-id :  {task_id} \n Thanks, you will receive the text later in : {email} at: {date} {time} task added on : {datetime.now()} ",
            "isOver5": "no",
            "task": task_id,
        }
        return jsonify(data)

    except Exception as e:
        print("error:", e)
        return "error in  img-ocr"
