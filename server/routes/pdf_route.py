from flask import Blueprint,request	
from flask_cors import CORS,cross_origin
from models.task_model import save_task_to_database
from controllers.pdf_controller import pdf_formatted_controller

pdf_bp = Blueprint("pdf_bp",__name__)
CORS(pdf_bp, supports_credentials=True)

@cross_origin()
@pdf_bp.route("/pdf/formatted",methods=["POST"])
def pdf_formatted_route():
	return pdf_formatted_controller(request)
