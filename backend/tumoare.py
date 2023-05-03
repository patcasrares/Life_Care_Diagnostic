import numpy as np
from PIL import Image


def read_tumoare(filePath):
    numpydata = 0
    try:
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
    except Exception:
        pass
    return numpydata

def diagnostic_tumoare(path, model_tumoare, norm):
    elem = read_tumoare(path)
    elem = np.array([elem])
    #print(elem.shape)
    elem = elem.astype('float32') / norm
    #print(model.predict(elem))
    try:
        y_prob = model_tumoare.predict(elem) 
        y_classes = y_prob.argmax(axis=-1)
    except Exception:
        y_classes = ["Invalid"]
    #print(y_classes)
    return y_classes[0]