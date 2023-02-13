import fitz
import uuid
import os
def pdf_reader(file_path):
    # file_path = "mypdf.pdf"
    dpi = 100 # choose desired dpi here
    zoom = dpi / 72  # zoom factor, standard: 72 dpi
    magnify = fitz.Matrix(zoom, zoom)  # magnifies in x, resp. y direction
    doc = fitz.open(file_path)  # open document
    pg=1
    converted_images=[]
    for page in doc:
        pix = page.get_pixmap(matrix=magnify)  # render page to an image
        each_image = f"{uuid.uuid4()}.png"
        converted_images.append(each_image)
        pix.save(os.path.join(os.getcwd(),"uploads",each_image))
        pg=pg+1
    
        if pg>5:
            return converted_images,"yes"
            break
    return converted_images,"no"

def pdf_reader_formatted(pdf_file):
    pdf_document = fitz.open(pdf_file)
    text = ""
    count=1
    for page in pdf_document:
        text += page.get_text("text")
        count = count+1
        if count >=6:
            return text,"yes"
            break
    return text

    



