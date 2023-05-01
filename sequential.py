import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import os
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.layers import Dense, Input, Dropout,Flatten, Conv2D
from tensorflow.keras.layers import BatchNormalization, Activation, MaxPooling2D
from tensorflow.keras.models import Model, Sequential
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint, ReduceLROnPlateau
from tensorflow.keras.utils import plot_model
from IPython.display import SVG, Image
from livelossplot.inputs.tf_keras import PlotLossesCallback
import tensorflow as tf
from sklearn.metrics import precision_score
from sklearn.metrics import recall_score
# calculates f1 for 1:100 dataset with 95tp, 5fn, 55fp
from sklearn.metrics import f1_score
print("Tensorflow version:", tf.__version__)


img_size = 48
batch_size = 64
datagen_train = ImageDataGenerator(horizontal_flip=True)
train_generator = datagen_train.flow_from_directory("../../content",
                                                    target_size=(img_size,img_size),
                                                    color_mode="grayscale",
                                                    batch_size=batch_size,
                                                    class_mode='categorical',
                                                    shuffle=True)
train_generator


# custom metrics
def precision(y_true, y_pred): #taken from old keras source code
    true_positives = K.sum(K.round(K.clip(y_true * y_pred, 0, 1)))
    predicted_positives = K.sum(K.round(K.clip(y_pred, 0, 1)))
    precision = true_positives / (predicted_positives + K.epsilon())
    return precision
def recall(y_true, y_pred): #taken from old keras source code
    true_positives = K.sum(K.round(K.clip(y_true * y_pred, 0, 1)))
    possible_positives = K.sum(K.round(K.clip(y_true, 0, 1)))
    recall = true_positives / (possible_positives + K.epsilon())
    return recall



# Initialising the CNN
model = Sequential()
# 1 - Convolution
model.add(Conv2D(64,(3,3), padding='same', input_shape=(40, 30,3)))
model.add(BatchNormalization())
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))
# 2nd Convolution layer
model.add(Conv2D(128,(5,5), padding='same'))
model.add(BatchNormalization())
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))
# 3rd Convolution layer
model.add(Conv2D(512,(3,3), padding='same'))
model.add(BatchNormalization())
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))
# 4th Convolution layer
model.add(Conv2D(512,(3,3), padding='same'))
model.add(BatchNormalization())
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))
# Flattening
model.add(Flatten())
# Fully connected layer 1st layer
model.add(Dense(256))
model.add(BatchNormalization())
model.add(Activation('relu'))
model.add(Dropout(0.25))
# Fully connected layer 2nd layer
model.add(Dense(512))
model.add(BatchNormalization())
model.add(Activation('relu'))
model.add(Dropout(0.25))
model.add(Dense(1, activation='softmax'))
lr_schedule = tf.keras.optimizers.schedules.ExponentialDecay(
        initial_learning_rate=1e-2,
        decay_steps=10000,
        decay_rate=0.9)
opt = Adam(learning_rate = lr_schedule)
model.compile(loss='mean_squared_error',  optimizer=opt, metrics=['accuracy', precision, recall])
model.summary()

from PIL import Image
from numpy import asarray
import numpy as np
import os
import keras
from keras.layers import Dense, Conv2D, BatchNormalization, Activation
from keras.layers import AveragePooling2D, Input, Flatten
from tensorflow.keras.optimizers import Adam
from keras.callbacks import ModelCheckpoint, LearningRateScheduler
from keras.callbacks import ReduceLROnPlateau
from keras.preprocessing.image import ImageDataGenerator
from keras.regularizers import l2
from keras import backend as K
from keras.models import Model
from keras.datasets import cifar10
import numpy as np
import os
from keras.utils import np_utils

def readImage(filePath):
    img = Image.open(filePath)
    
    size=(30,40)
    #resize image
    out = img.resize(size)

    # asarray() class is used to convert
    # PIL images into NumPy arrays
    numpydata = asarray(out)
    numpydata = np.repeat(numpydata[:, :, np.newaxis], 3, axis=2)
    # <class 'numpy.ndarray'>
    #print(type(numpydata))

    #  shape
    #print(numpydata.shape)
    return numpydata
print(readImage('../../content/Benign/B_3141_1.RIGHT_CC.LJPEG.1_highpass.gif'))

listFiles = os.listdir('../../content/Benign/')
print(listFiles[:5])

listFiles = os.listdir('../../content/Malign/')
print(listFiles[:5])
for elem in listFiles:
    img = readImage('../../content/Malign/'+elem)
    listResults += [np.array([2])]
    listCancer += [img]


x_train=[]
y_train=[]
accs=[]
def main(pz):
    #model.compile(loss='mean_squared_error',  optimizer=opt, metrics=['accuracy', precision, recall])
    per = np.random.permutation(len(listCancer))
    ln = int(len(listCancer) * 0.8)
    x_train = []
    y_train = []
    x_test = []
    y_test = []
    positions = []
    for i in range(ln):
        positions += [per[i]]
    for i in range(len(listCancer)):
        if i in positions:
            x_train += [listCancer[i]]
            y_train += [listResults[i]]
        else:
            x_test += [listCancer[i]]
            y_test += [listResults[i]]
            
    ln = len(x_test) // 2
    
    x_valid = x_test[ln:]
    y_valid = y_test[ln:]
    
    x_test = x_test[:ln]
    y_test = y_test[:ln]
    
    x_train = np.array(x_train)
    y_train = np.array(y_train)

    x_test = np.array(x_test)
    y_test = np.array(y_test)
    
    x_valid = np.array(x_valid)
    y_valid = np.array(y_valid)
    
    model.fit(x_train, y_train,
                epochs = 100,
                batch_size=16,
                validation_data =(x_valid, y_valid),
                shuffle = True)
    scores = model.evaluate(x_test, y_test, verbose = 1)
    print('Test loss:', scores[0])
    print('Test accuracy:', scores[1])
    ret = model.predict(x_test)
    result = []
    pred = []
    for a,b in zip(ret, y_test):
        pred+=[a[0]]
        result+=[b[0]]
    print(pred)
    print(result)
    precision = precision_score(result, pred, average='weighted')
    recall = recall_score(result, pred, average='weighted')
     # calculates f1 for 1:100 dataset with 95tp, 5fn, 55fp
    fmeasure = f1_score(result, pred, average='weighted')
    print('Precision: ', precision)
    print('Recall: ', recall)
    print('F1 Score: ', fmeasure)
    #precisions += [precision]
    #recalls += [recall]
    #model.save('saved_models/Sequential'+pz+'.h5')
    return [scores[1], precision, recall, fmeasure]


accs=[]
precisions = []
recalls = []
fmeasures = []
for i in range(10):
    ret = main(i)
    accs+=[ret[0]]
    precisions+=[ret[1]]
    recalls+=[ret[2]]
    fmeasures+=[ret[3]]
print(accs)
print(precisions)
print(recalls)
print(fmeasures)