import numpy as np
from PIL import Image

def read_face(filePath):
    img = Image.open(filePath)
    
    size=(30,40)
    #resize image
    out = img.resize(size)

    # asarray() class is used to convert
    # PIL images into NumPy arrays
    numpydata = np.asarray(out)
    numpydata = np.repeat(numpydata[:, :, np.newaxis], 3, axis=2)
    # <class 'numpy.ndarray'>
    #print(type(numpydata))

    #  shape
    #print(numpydata.shape)
    return numpydata

def diagnostic_face(path, model_face):
    elem = read_face(path)
    elem = np.array([elem])
    d = elem.flat
    d = list(d)
    while len(d)>40*30*9:
        d.pop()
    while len(d)<40*30*9:
        d+=[0]
    elem = elem.reshape(1, 40*30*9)
    y_prob = model_face.predict(elem) 
    #print(y_prob)
    #y_classes = y_prob.argmax(axis=-1)
    #print(y_classes)
    return y_prob