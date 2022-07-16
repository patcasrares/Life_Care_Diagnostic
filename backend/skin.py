import numpy as np
from PIL import Image

def read_skin(filePath):
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

def diagnostic_skin(path, model_skin):
    elem = read_skin(path)
    elem = np.array([elem])
    elem = elem.reshape(1, 40, 30, 9)
    #print(elem.shape)
    elem = elem.astype('float32') / 255
    #print(model.predict(elem))
    y_prob = model_skin.predict(elem) 
    #print(y_prob)
    y_classes = y_prob.argmax(axis=-1)
    #print(y_classes)
    return y_classes[0]