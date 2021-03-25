from IPython.display import display
import matplotlib.pyplot as plt
# matplotlib inline
# import numpy as np
import os
# import shutil
# import posixpath
import json
import wfdb


# # Can also read the same files hosted on PhysioNet https://physionet.org/content/challenge-2015/1.0.0
# # in the /training/ database subdirectory.
# # record2 = wfdb.rdrecord('a103l', pn_dir='challenge-2015/training/')
# # print(record2.record_name)
# # print(record2.n_sig)

# signal, fields=wfdb.rdsamp('100',channels=[0, 1], sampfrom=0, sampto=1500, pn_dir='mitdb/')
# #mitdb数据库的是数据是两导联，格式是[650000,2]的数据，channels是选择读取哪一个导联的
# print(len(signal))
# print('signal:',signal)
# print('fields:',fields)
# plt.plot(signal)
# plt.ylabel(fields['units'][0])
# plt.legend([fields['sig_name'][0],fields['sig_name'][1]])
# plt.show()




dl_dir="D:\\Downloads"

if __name__ == '__main__': #这一段必须要加
    wfdb.dl_database('mitdb', dl_dir)
    display(os.listdir(dl_dir))
