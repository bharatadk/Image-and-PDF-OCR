import easyocr as ocr  #OCR
import os
def ocr_reader(filename):
    reader = ocr.Reader(['en'],model_storage_directory='models')
    result = reader.readtext(os.path.join(os.getcwd(),"uploads",filename), detail=0, paragraph=True, y_ths = -0.1)
    return result
