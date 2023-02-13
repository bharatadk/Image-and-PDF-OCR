import fitz

def pdf_to_text(pdf_file):
    pdf_document = fitz.open(pdf_file)
    text = ""
    count=1
    for page in pdf_document:
        text += page.get_text("text")
        count = count+1
        if count >=6:
            break
    return text

if __name__ == '__main__':
    pdf_file = "internet.pdf"
    text = pdf_to_text(pdf_file)
    print(text)