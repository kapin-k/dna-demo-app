from flask import Flask, request, jsonify
from subprocess import *
import sys
import json


app = Flask(__name__)
@app.route("/config", methods=["GET"])
def preset():
    f = open("output.json")
    preset_data = f.read()
    #data_to_srv = json.dumps(data)
    #output_frm_srv = Popen([sys.executable,"smarten-demo-srv.py", data_to_srv],shell = True, stdout=PIPE, universal_newlines=True).stdout
    #data_frm_server = output_frm_srv.read()
    return jsonify(preset_data)

@app.route("/analyze", methods=["POST"])
def rev_proxy():
    data = request.json
    data_to_srv = json.dumps(data)
    output_frm_srv = Popen(["python","smarten-demo-srv.py", data_to_srv], stdout=PIPE,universal_newlines=True).stdout
    data_frm_server = output_frm_srv.read()
    data_frm_server = jsonify(data_frm_server)
    return data_frm_server
    
if __name__ == '__main__':
    app.run(host = '0.0.0.0')

