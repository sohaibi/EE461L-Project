import logging
from flask_cors import CORS, cross_origin
from flask import Flask, jsonify, request, session, send_from_directory, send_file, Blueprint
from data_service import hardware, user, project, dataset
from passlib.hash import pbkdf2_sha256
from bson import ObjectId, json_util
import io
import os
import shutil


dataset_module = Blueprint("dataset_module", __name__)

@dataset_module.route("/dataset_module")
def second():
    return "dataset_module"

#Returns the names of each dataset for display
@dataset_module.route('/dataset_names', methods=['GET', 'POST'])
def datasetNames():
    # GET:
    if request.method == 'GET':
        data_names = dataset.getDatasetNames()
        return jsonify(data_names)
    
#returns the keys to each Dataset
@dataset_module.route('/dataset_titles', methods=['GET', 'POST'])
def datasetTitles():
    # GET:
    if request.method == 'GET':
        data_titles = dataset.getDatasetTitles()
        return jsonify(data_titles)

#Handles zip download
@dataset_module.route('/uploads', methods=['GET', 'POST'])
def download():
    if request.method == 'POST':
        file_name = request.form['filepath']
        if dataset.getZip(file_name) == True:
            #grabs zip from snippets folder
            zip = send_from_directory(directory=app.config['snippets'], filename=file_name, as_attachment=True)
            #deletes data folder and data zip from /snippets
            partial_path = app.config['snippets']
            data_folder_path = partial_path+file_name[:-4]
            zip_path = partial_path+file_name
            shutil.rmtree(data_folder_path)
            #zip.close()
            if os.path.exists(zip_path):
                os.remove(zip_path)
            #returns the saved zip file
            return zip
    return "hello"