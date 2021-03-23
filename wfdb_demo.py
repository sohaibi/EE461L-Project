from IPython.display import display
import matplotlib.pyplot as plt
# matplotlib inline
import numpy as np
import os
import shutil
import posixpath
import json
import wfdb


# Can also read the same files hosted on PhysioNet https://physionet.org/content/challenge-2015/1.0.0
# in the /training/ database subdirectory.
# record2 = wfdb.rdrecord('a103l', pn_dir='challenge-2015/training/')
# print(record2.record_name)
# print(record2.n_sig)

# Demo 2 - Read certain channels and sections of the WFDB record using the simplified 'rdsamp' function
# which returns a numpy array and a dictionary. Show the data.
# Can also read the same files hosted on Physionet
[signals2, fields2] = wfdb.rdsamp('s0010_re', channels=[14, 0, 5, 10], sampfrom=100, sampto=15000, pn_dir='ptbdb/patient001/')
display(signals)
display(fields)