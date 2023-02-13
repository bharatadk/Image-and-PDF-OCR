# importing libraries
from flask_mail import Mail, Message
from flask import current_app
from app import mail
from app import app


def mail_sender(all_text,email):
    try:
        with app.app_context():
            print("000000000")
            msg = Message(
            				'OCR Reader',
            				sender ='bharatadhikari7243@gmail.com',
            				        recipients=[email]

            			)
            msg.body = all_text
            mail.send(msg)
    except:
        print("🐛 in mail_sender")

        return None

    
