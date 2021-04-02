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
        dataset_names.append(str(dbs[i][1]))
    return dataset_names

def getDatasetTitles():
    dbs = wfdb.get_dbs()
    dataset_list = []
    for i in range(0, len(dbs)):
        dataset_list.append(str(dbs[i][0])+".zip")
    return dataset_list

def getRecordList(database_name):
    records = wfdb.get_record_list(database_name)
    dir = '/Users/monamcelroy/Desktop/EE461L-Project/snippets/'+str(database_name)
    return dir

def generateZip(database_name, dir):
    #if __name__ == '__main__':
        print("entered generateZip()")
        #dir2 = dir.replace(".zip", "")
        #dir2 = dir[:-4]
        wfdb.dl_database(database_name, dir)
        print("completed .dl_database()")
        #zipf = zipfile.ZipFile(dir+'.zip', 'w')
        zipf = zipfile.ZipFile(dir+'.zip', 'w')
        #zipdir(dir, zipf)
        #zipf.close()
        return zipf 

def getZip(database_name):
    #dir = getRecordList(database_name)
    #zip = generateZip(database_name, dir)
    #return zip
    zipf = zipfile.ZipFile('/Users/monamcelroy/Desktop/aami-ec13.zip', 'r')
    return zipf

#trying to fix runtime error
def getZip2(database_name):
    #if __name__ == '__main__':
        print("getZip2 called again")
        database_name = database_name[:-4]
        dir = '/Users/monamcelroy/Desktop/EE461L-Project/snippets/'+str(database_name)
        #print(dir)
        #dir = dir[:-4]
        print(dir)
        print("completed get record list")
        zip = generateZip(database_name, dir)
        print("exitted generateZIp()")
        return True
        #zipf = zipfile.ZipFile('/Users/monamcelroy/Desktop/aami-ec13.zip', 'r')
    #return False


def main():
    #print("Hello World")
    #getZip2('adfecgdb')
    getZip2('adfecgdb.zip')

#main()
   
