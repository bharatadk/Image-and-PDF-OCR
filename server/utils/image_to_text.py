import easyocr as ocr
import os
from flask import current_app
from app import app

# from utils import mail_sender
def image_to_text(email,filenames):
    try:
        all_text=""
        with app.app_context():
            for filename in filenames:
                reader = ocr.Reader(['en'],gpu=False, verbose=False,model_storage_directory='ml_models')
                result = reader.readtext(os.path.join(current_app.config["UPLOAD_FOLDER"],filename), detail=0, paragraph=True, y_ths = -0.1)
                all_text = all_text + "\n".join(result)
                # mail_sender(all_text,email)
            return all_text

    except Exception as e:
        print("🐛 in image_to_text",e)
        

