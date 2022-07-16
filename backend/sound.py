import librosa
import numpy as np

def read_sound(file_path):
    y, sr = librosa.load(file_path, res_type='kaiser_fast',duration=2.5,sr=22050*2,offset=0.5)
    return librosa.feature.melspectrogram(y=y, sr=sr)

def diagnostic_sound(path, model_sound):
    elem = read_sound(path)
    elem = np.array([elem])
    d = elem.flat
    d = list(d)
    while len(d)>128*95:
        d.pop()
    while len(d)<128*95:
        d+=[0]
    elem = np.array(d)
    elem = elem.reshape(1, 128 * 95)
    #print(elem.shape)
    #print(model.predict(elem))
    y_prob = model_sound.predict(elem) 
    #print(y_prob)
    #y_classes = y_prob.argmax(axis=-1)
    #print(y_classes)
    return y_prob