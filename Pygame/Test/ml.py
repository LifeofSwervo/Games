import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import mglearn
from sklearn.datasets import load_iris

irisDataset = load_iris()
print("Keys of iris_dataset: \n{}".format(irisDataset.keys()))