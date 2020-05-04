from flask import Flask, request, jsonify
from subprocess import *
import sys
import json

host = '0.0.0.0'    #IP address on which this server has to run 
port_no = 5000      #Port number for the server

app = Flask(__name__)
@app.route("/config", methods=["GET"])
def preset():
    f = open("output.json")
    preset_data = f.read()
    return jsonify(preset_data)

@app.route("/analyze", methods=["POST"])
def rev_proxy():
    data = request.json #data from the application, contains list of coordinates [x,y]
    
    data = json.dumps(data) #Converting to json format with 'Read' as key
    data_to_process = json.loads(data)

    print(len(data_to_process["Read"]))
    data_processed = []
    for i in range(len(data_to_process["Read"])):
        data_processed.append(data_to_process["Read"][i][1])

    data_to_srv = json.dumps({"Read":data_processed})
    
    output_frm_srv = Popen(["python3","smarten-demo-srv.py", data_to_srv], stdout=PIPE,universal_newlines=True).stdout
    data_frm_server = output_frm_srv.read()
    data_frm_server = jsonify(data_frm_server)
    return data_frm_server
    
if __name__ == '__main__':
    app.run(host = host, port = port_no)  
