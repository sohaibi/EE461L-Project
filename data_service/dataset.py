import os
import zipfile
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

#returns the list of keys to the dataset names
def getDatasetTitles():
    dbs = wfdb.get_dbs()
    dataset_list = []
    for i in range(0, len(dbs)):
        dataset_list.append(str(dbs[i][0])+".zip")
    return dataset_list

#return test for both names and keys
def getDatasetInfo():
    dbs = wfdb.get_dbs()
    dataset_keys = []
    dataset_names = []
    for i in range(0, len(dbs)):
        dataset_keys.append(str(dbs[i][0]))
        dataset_names.append(str(dbs[i][1]))
    total_info = [dataset_keys, dataset_names]
    return total_info

#downloads data into folder, creates zip
def generateZip(database_name, dir):
    #if __name__ == '__main__':
    print("entered generateZip()")
    wfdb.dl_database(database_name, dir)
    print("completed .dl_database()")
    zipf = zipfile.ZipFile(dir+'.zip', 'w')
    zipdir(dir, zipf)
    zipf.close()
    return zipf 

#uses database_name to derive directory then creates zip
def getZip(database_name):
    database_name = database_name[:-4]
    dir = os.path.dirname(os.path.abspath(__file__))+'/snippets/'+str(database_name)
    dir = dir.replace('/data_service/', '/')
            #dir = '/Users/monamcelroy/Desktop/EE461L-Project/snippets/'+str(database_name)
    zip = generateZip(database_name, dir)
    return True

def getZip2(database_name):
    print("in progess")


def main():
    getZip('adfecgdb.zip')

#main()
   
