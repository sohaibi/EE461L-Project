from IPython.display import display
import matplotlib.pyplot as plt
import numpy as np
import os
import shutil
import posixpath
import zipfile
import shutil

import wfdb

def zipdir(path, ziph):
    # ziph is zipfile handle
    for root, dirs, files in os.walk(path):
        for file in files:
            ziph.write(os.path.join(root, file), 
                       os.path.relpath(os.path.join(root, file), 
                                       os.path.join(path, '..')))

#returns list of 10 dataset names to be displayed on frontend page
def getDatasetNames():
    dbs = wfdb.get_dbs()
    dataset_names = []
    dataset_list = []
    for i in range(0, len(dbs)):
        dataset_list.append(dbs[i])
        dataset_names.append(dbs[i][1])
    return dataset_names

def getRecordList(database_name):
    records = wfdb.get_record_list(database_name)
    dir = '/Users/monamcelroy/Desktop/EE461L-Project/'+str(records[1])
    return dir

def generateZip(database_name, dir):
    wfdb.dl_database(database_name, dir)
    zipf = zipfile.ZipFile(dir+'test.zip', 'w')
    #zipdir(dir, zipf)
    #zipf.close()
    return zipf 

def getZip(database_name):
    #dir = getRecordList(database_name)
    #zip = generateZip(database_name, dir)
    #return zip
    zipf = zipfile.ZipFile('/Users/monamcelroy/Desktop/aami-ec13.zip', 'r')
    return zipf
    

def zipdir(path, ziph):
    # ziph is zipfile handle
    for root, dirs, files in os.walk(path):
        for file in files:
            ziph.write(os.path.join(root, file), 
                       os.path.relpath(os.path.join(root, file), 
                                       os.path.join(path, '..')))

#getZip('aami-ec13')
   
