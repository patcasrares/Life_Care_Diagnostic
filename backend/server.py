# Import the necessary libraries
from survival import survivalModel
from tumoare import diagnostic_tumoare
from skin import diagnostic_skin
from sound import diagnostic_sound
from face import diagnostic_face


import pickle


# loading json and creating model
from keras.models import model_from_json

json_file = open('./saved_models/breastResNetModel.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
model_tumoare_resnet = model_from_json(loaded_model_json)
model_tumoare_resnet.load_weights('saved_models/breastResNetV0.h5')
model_tumoare_resnet.summary()

json_file = open('./saved_models/tumoare.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
model_tumoare_resnet_fixed = model_from_json(loaded_model_json)
model_tumoare_resnet_fixed.load_weights('saved_models/tumoare.h5')
model_tumoare_resnet_fixed.summary()


json_file = open('saved_models/skinResNetModel.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
model_skin_resnet = model_from_json(loaded_model_json)
model_skin_resnet.load_weights('saved_models/skinResNetVOK.h5')
model_skin_resnet.summary()


json_file = open('saved_models/skin.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
model_skin_sequential = model_from_json(loaded_model_json)
model_skin_sequential.load_weights('saved_models/skin.h5')
model_skin_sequential.summary()

pkl_filename = "pickle_model.pkl"
with open(pkl_filename, 'rb') as file:
    pickle_model = pickle.load(file)
    model_sound = pickle_model
    
pkl_filename = "face.pkl"
with open(pkl_filename, 'rb') as file:
    pickle_model = pickle.load(file)
    model_face = pickle_model


from flask import Flask, request
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/survivalChances', methods=["POST", "GET"])
@cross_origin()
def survivalChances():
    age = float(request.args.get('age'))
    nodes = float(request.args.get('nodes'))
    rsp = survivalModel(age, nodes)
    print(rsp)
    return str(rsp)


@app.route('/breastCancer', methods=["POST", "GET"])
@cross_origin()
def breastCancer():
    print(request)
    print(request.files)
    pic= request.files.get('image','')
    filePath = "user_uploads/breast.jpg"
    open(filePath, 'wb').write(pic.read())
    rsp = str(diagnostic_tumoare(filePath, model_tumoare_resnet, 255)) + str(diagnostic_tumoare(filePath, model_tumoare_resnet_fixed, 255))
    return str(rsp)

@app.route('/skin', methods=["POST", "GET"])
@cross_origin()
def skin():
    print(request)
    print(request.files)
    pic= request.files.get('image','')
    filePath = "user_uploads/skin.jpg"
    open(filePath, 'wb').write(pic.read())
    rsp = str(diagnostic_skin(filePath, model_skin_resnet)) + str(diagnostic_skin(filePath, model_skin_sequential))
    return str(rsp)

@app.route('/sound', methods=["POST", "GET"])
@cross_origin()
def sound():
    print(request)
    print(request.files)
    pic= request.files.get('sound','')
    filePath = "user_uploads/sound.wav"
    open(filePath, 'wb').write(pic.read())
    if pic !='':
        rsp = diagnostic_sound(filePath, model_sound)
        return str(rsp)
    return '0'

@app.route('/face', methods=["POST", "GET"])
@cross_origin()
def face():
    print(request)
    print(request.files)
    pic= request.files.get('face')
    filePath = "user_uploads/face.png"
    open(filePath, 'wb').write(pic.read())
    rsp = diagnostic_face(filePath, model_face)
    print(rsp)
    return str(rsp)

if __name__ == '__main__':
    app.run()