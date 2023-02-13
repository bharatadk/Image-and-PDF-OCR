# importing libraries
from flask_mail import Mail, Message



def mail_sender(message_body,mail,user_email,app):
   
    #mail = Mail(app)
    #SMTP_HOST = "smtp.gmail.com"
    #SMTP_PORT = 465
    #SMTP_MAIL = "bharatadhikari7243@gmail.com"
    #SMTP_PASSWORD = "elpoegymgpqoeyuy"
    #SMTP_SERVICE = "gmail"
    with app.app_context():
        print("000000000")
        recipients=[user_email]
        msg = Message(
        				'OCR Reader',
        				sender ='bharatadhikari7243@gmail.com',
        				        recipients=[user_email]

        			)
        msg.body = message_body
        mail.send(msg)
    return 'Sent'

    
