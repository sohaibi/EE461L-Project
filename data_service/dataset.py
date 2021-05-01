import os
import zipfile
import wfdb



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

   
