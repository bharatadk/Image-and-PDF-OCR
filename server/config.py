import logging


mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 587,
    "MAIL_USE_TLS": True,
    "MAIL_USE_SSL": False,
    "MAIL_USERNAME": 'bharatadhikari7243@gmail.com',
    "MAIL_PASSWORD": 'elpoegymgpqoeyuy',
}

def setup_logging():
    logging.basicConfig(level=logging.INFO)
    return

