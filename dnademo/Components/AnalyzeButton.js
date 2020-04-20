import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';

import Request from './Request.json';

export class AnalyzeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    // var RNFS = require('react-native-fs')
    // var filePath = RNFS.DocumentDirectoryPath + '/Request_File.json';
    // if(RNFS.exists(filePath)){
    //   var fileData = RNFS.readFile(filePath, 'utf8');
    // }
    // var checkParse = JSON.parse(Request)
    // console.log('ParseCheck:' + checkParse.id);
    // console.log('Analaze button data: ' + this.state.dnapath)
    return (
      <View>
        <Button
              type="clear"
              icon={<Icon name="play-circle" size={60} color="#34C759" />}
              onPress={() => {
                console.log('Output Overlay is opened');
                switch(this.state.chosenOutput){
                  case 1: 
                    this.canvas.deletePath(0);
                    break;
                  case 2: 
                    this.canvas.deletePath(1);
                    break;
                  case 3: 
                    this.canvas.deletePath(2);
                    break;
                  case 4: 
                    this.canvas.deletePath(3);
                    break;
                  case 5: 
                    this.canvas.deletePath(4);
                    break;
                }
                this.setState({
                  outputOverlay_visible: true,
                  chosenOutput: null,
                });

                var filePath = RNFS.DocumentDirectoryPath + '/Response.json';
                var split2 = '';

                var path_json = this.canvas.getPaths();

                function roundTo(n, digits) {
                    if (digits === undefined) {
                      digits = 0;
                    }
                    var multiplicator = Math.pow(10, digits);
                    n = parseFloat((n * multiplicator).toFixed(11));
                    return Math.round(n) / multiplicator;
                  }

                function scaleYaxistoSmallerValue(item, index) {
                    // console.log('item : '+ item);
                    var y_coordinate = item.split(",");
                    // console.log('y coordinate '+ y_coordinate[0]+' '+ y_coordinate[1]);
                    var value = roundTo((y_coordinate[1] / 100).toFixed(3), 2);
                    value = roundTo((value / 2).toFixed(3), 2);
                    value = value - 2;
                    value = Math.round(value * 100) / 100;
                    path_json[i].path.data[index] = y_coordinate[0].concat(',',value);
                  }
                  for (var i = 0; i < path_json.length; i++) {
                    path_json[i].path.data.forEach(scaleYaxistoSmallerValue);
                  }

                var userInput = "[";
                for(var k = 0; k < this.canvas.getPaths().length; k++){
                  if(k != 0){
                    userInput = userInput.concat(",");
                  }
                  if(this.canvas.getPaths()[k].path.color == "#1C1C1E"){
                    userInput = userInput.concat(JSON.stringify(this.canvas.getPaths()[k]));
                  }
                }
                userInput = userInput.concat("]");

                // var userInput = JSON.stringify(this.canvas.getPaths());
                if (userInput == '[]') {
                  Alert.alert(
                    'Oops, empty drawing board!',
                    'If you dont know where to start, please checkout the sample traces by clicking on the blue icon. Happy tracing!!!',
                    [{text: 'Okay', onPress: () => console.log('OK Pressed')}],
                    {cancelable: false},
                  );
                }

                console.log('userInput : ' + userInput);
                var split1 = userInput.split('data":');
                for (var i = 1; i < split1.length; i++) {
                  var temp_split = split1[i].split('},"s');
                  split2 = split2.concat(temp_split[0]);
                  split2 = split2.replace(/",/g, '],');
                  split2 = split2.replace(/"/g, '[');
                  split2 = split2.replace('[]', ']]');
                  split2 = split2.replace('][', '],[');
                }
                //var readSplit = '"Read":' + split2;
                //var dataToServer = "'{".concat(readSplit).concat("}'");
                split2 = split2.replace('[[', '[*');
                split2 = split2.replace(']]', ']');
                split2 = split2.replace('[[', '[');
                split2 = split2.replace('[*', '[[');
                var Read = JSON.stringify(split2);
                console.log('dataToServer : ' + Read);

                // Just for testing (Change per user)
                // RNFS.writeFile('/Users/invenstphonethree/Documents/dna-demo-app/dnademo/Components/Request.json',userInput,'utf8',);

                //Incase we need to write a json file for the output recieved from the Server
                RNFS.writeFile(filePath, userInput, 'utf8')
                  .then(success => {
                    console.log('File written to device filesystem!');
                  })
                  .catch(err => {
                    console.log(err.message);
                  });

                this.setState(
                  {
                    path: userInput,
                    chosenSample: null,
                  },
                  () => {},
                );

                {
                  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<Backend Calls />~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                }

                my_proxy.get('/config') //,{Read})
                .then((response) => {
                    var convertJSON = response.data.replace(/'/g, '"');
                    var dataToJSON = JSON.parse(convertJSON);

                    responsefromServer.splice(0, 0, dataToJSON[0]);
                    responsefromServer.splice(1, 0, dataToJSON[1]);
                    responsefromServer.splice(2, 0, dataToJSON[2]);
                    responsefromServer.splice(3, 0, dataToJSON[3]);
                    responsefromServer.splice(4, 0, dataToJSON[4]);

                    function scaleYaxis(item, index) {
                      var value = (item + 2) * 200;
                      responsefromServer[i].Read[index] = Math.round(value * 10) / 10;
                    }
                    for (var i = 0; i < 5; i++) {
                      responsefromServer[i].Read.forEach(scaleYaxis);
                      switch (i) {
                        case 0:
                          sample_color = '#007AFF';
                          var name_string = responsefromServer[0].Name;
                          var time_string = responsefromServer[0].Time;
                          var confidence_string = responsefromServer[0].Confidence;
                          var meter_string = confidence_string * 100;
                          var outPut1 = this.preparePathData(
                            responsefromServer[i].Read,
                            i,
                            sample_color,
                          );
                          addOutput.splice(0, 0, JSON.parse(outPut1));
                          this.setState({
                            outputPath: addOutput,
                            OP1_Name: name_string,
                            OP1_Time: time_string,
                            OP1_Confidence: confidence_string,
                            OP1_Meter: meter_string,
                          });
                          break;
                        case 1:
                          sample_color = '#FF2D55';
                          var name_string = responsefromServer[1].Name;
                          var time_string = responsefromServer[1].Time;
                          var confidence_string = responsefromServer[1].Confidence;
                          var meter_string = confidence_string * 100;
                          var outPut2 = this.preparePathData(
                            responsefromServer[i].Read,
                            i,
                            sample_color,
                          );
                          addOutput.splice(1, 0, JSON.parse(outPut2));
                          this.setState({
                            outputPath: addOutput,
                            OP2_Name: name_string,
                            OP2_Time: time_string,
                            OP2_Confidence: confidence_string,
                            OP2_Meter: meter_string,
                          });
                          break;
                        case 2:
                          sample_color = '#AF52DE';
                          var name_string = responsefromServer[2].Name;
                          var time_string = responsefromServer[2].Time;
                          var confidence_string = responsefromServer[2].Confidence;
                          var meter_string = confidence_string * 100;
                          var outPut3 = this.preparePathData(
                            responsefromServer[i].Read,
                            i,
                            sample_color,
                          );
                          addOutput.splice(2, 0, JSON.parse(outPut3));
                          this.setState({
                            outputPath: addOutput,
                            OP3_Name: name_string,
                            OP3_Time: time_string,
                            OP3_Confidence: confidence_string,
                            OP3_Meter: meter_string,
                          });
                          break;
                        case 3:
                          sample_color = '#FF9500';
                          var name_string = responsefromServer[3].Name;
                          var time_string = responsefromServer[3].Time;
                          var confidence_string = responsefromServer[3].Confidence;
                          var meter_string = confidence_string * 100;
                          var outPut4 = this.preparePathData(
                            responsefromServer[i].Read,
                            i,
                            sample_color,
                          );
                          addOutput.splice(3, 0, JSON.parse(outPut4));
                          this.setState({
                            outputPath: addOutput,
                            OP4_Name: name_string,
                            OP4_Time: time_string,
                            OP4_Confidence: confidence_string,
                            OP4_Meter: meter_string,
                          });
                          break;
                        case 4:
                          sample_color = '#34C759';
                          var name_string = responsefromServer[4].Name;
                          var time_string = responsefromServer[4].Time;
                          var confidence_string = responsefromServer[4].Confidence;
                          var meter_string = confidence_string * 100;
                          var outPut5 = this.preparePathData(
                            responsefromServer[i].Read,
                            i,
                            sample_color,
                          );
                          addOutput.splice(4, 0, JSON.parse(outPut5));
                          this.setState({
                            outputPath: addOutput,
                            OP5_Name: name_string,
                            OP5_Time: time_string,
                            OP5_Confidence: confidence_string,
                            OP5_Meter: meter_string,
                          });
                          break;
                      }
                    }
                  }
                 ).catch(error => {console.log(error)});
                 {this.setState({
                   responseJSON: responsefromServer,
                 })}
              }}
            />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  analyzeButton: {
    marginBottom: 10,
    marginRight: 8,
    height: 60,
    width: 200,
    alignSelf: 'center',
    backgroundColor: '#ccffdd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45,
  },
  textFill: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

AppRegistry.registerComponent('AnalyzeButton', () => AnalyzeButton);
