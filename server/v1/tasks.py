# tasks.py
#from celery import Celery
import easyocr as ocr  #OCR
import os
#celery = Celery(__name__,  broker='memory:///')
#@celery.task
def extract_data_from_image(filename,mail_sender,mail,user_email,app):
    reader = ocr.Reader(['en'],model_storage_directory='models')
    result = reader.readtext(os.path.join(os.getcwd(),"uploads",filename), detail=0, paragraph=True, y_ths = -0.1)
    print("")
    print("")
    print("")
    print(result)

    #mail_sender("\n".join(result))
    mail_sender("\n".join(result),mail,user_email,app)
    return result
