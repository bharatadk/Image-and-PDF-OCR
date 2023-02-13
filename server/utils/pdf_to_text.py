import os
import fitz
from flask import current_app
from app import app

# from utils import mail_sender

def pdf_to_text(email,filenames):
    with app.app_context():
        try:
            pdf_document = fitz.open(os.path.join(current_app.config["UPLOAD_FOLDER"],filenames[0]))
            text = ""
            count=1
            for page in pdf_document:
                text += page.get_text("text")
                count = count+1
                if count >=6:
                    return text
            return text
        except Exception as e:
            print(e)


# def image_to_text(email,filenames):
#     try:
#         all_text=""
#         with app.app_context():
#             for filename in filenames:
#                 reader = ocr.Reader(['en'],gpu=False,model_storage_directory='ml_models')
#                 result = reader.readtext(os.path.join(current_app.config["UPLOAD_FOLDER"],filename), detail=0, paragraph=True, y_ths = -0.1)
#                 all_text = all_text + "\n".join(result)
#                 # mail_sender(all_text,email)
#             return all_text

#     except Exception as e:
#         print("🐛 in image_to_text",e)
        

