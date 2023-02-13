from flask import Blueprint,request	
from flask_cors import CORS,cross_origin
from models.task_model import save_task_to_database
from controllers.image_controller import image_controller

image_bp = Blueprint("image_bp",__name__)
CORS(image_bp, supports_credentials=True)

@cross_origin()
@image_bp.route("/image",methods=["POST"])
def image_route():
	return image_controller(request)
