import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TouchableWithoutFeedback,
  Modal,
  Linking,
} from 'react-native';
import {Button} from 'react-native-elements';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import presetJSON from './Sample_Screens/Preset.json';
import sample1 from './Sample_Screens/Sample1.png';
import sample2 from './Sample_Screens/Sample2.png';
import sample3 from './Sample_Screens/Sample3.png';
import sample4 from './Sample_Screens/Sample4.png';
import sample5 from './Sample_Screens/Sample5.png';

// Imports and constants for backend
import axios from 'axios';
const serv = 'http://smarten-env.eba-9hfjufww.us-east-2.elasticbeanstalk.com'; //Configure with the URL Address of Server
const my_proxy = axios.create({
  baseURL: serv,
});

// COLOUR SCHEME
// ios-black #1C1C1E
// ios-blue #007AFF
// ios-pink #FF2D55
// ios-purple #AF52DE
// ios-orange #FF9500
// ios-green #34C759
// ios-indigo #5856d6

// Parameters to change the Stroke Thickness, Stroke Color, Font Face and Font Color of the output display
const strokethickness_op = 18;
const resultcol = ['#007AFF', '#FF2D55', '#AF52DE', '#FF9500', '#34C759'];
const font_op = 'Helvetica Neue';
const color_op = '#1C1C1E';

// Parameters to change the Stroke Color and Stroke Thickness of the Drawing Board for User Input
const strokecolor_main = '#1C1C1E';
const strokethickness_main = 12;
const samplecol = [
  '#007AFF',
  '#FF2D55',
  '#AF52DE',
  '#FF9500',
  '#34C759',
  '#5856d6',
];

const initialState = null;
export class DrawingBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#1C1C1E',
      message: '',
      chosenSample: null,
      chosenOutput: null,
      path: null,
      // Trace for sample is calculated only once
      firstClickonSample: true,
      // Use these state variables to display
      dnaName: null,
      dnaConfidence: null,
      dnaTime: null,
      ifOutput: false,
      // Overlay visibility
      sampleOverlay_visible: false,
      outputOverlay_visible: false,
      // Stores the path to be added to the drawing board
      tracePath: null,
      outputPath: null,
      // Has the response data stored accordingly (Upto 5 results)
      responseJSON: null,
      OP1_Name: '',
      OP2_Name: '',
      OP3_Name: '',
      OP4_Name: '',
      OP5_Name: '',
      OP1_Time: '',
      OP2_Time: '',
      OP3_Time: '',
      OP4_Time: '',
      OP5_Time: '',
      OP1_Confidence: '',
      OP2_Confidence: '',
      OP3_Confidence: '',
      OP4_Confidence: '',
      OP5_Confidence: '',
      OP1_Meter: '',
      OP2_Meter: '',
      OP3_Meter: '',
      OP4_Meter: '',
      OP5_Meter: '',
      // Set true if an output is there to be displayed
      OP1: false,
      OP2: false,
      OP3: false,
      OP4: false,
      OP5: false,
    };

    resetResponse = () => {
      this.setState({
        responseJSON: initialState,
        OP1_Name: '',
        OP2_Name: '',
        OP3_Name: '',
        OP4_Name: '',
        OP5_Name: '',
        OP1_Time: '',
        OP2_Time: '',
        OP3_Time: '',
        OP4_Time: '',
        OP5_Time: '',
        OP1_Confidence: '',
        OP2_Confidence: '',
        OP3_Confidence: '',
        OP4_Confidence: '',
        OP5_Confidence: '',
        OP1_Meter: '',
        OP2_Meter: '',
        OP3_Meter: '',
        OP4_Meter: '',
        OP5_Meter: '',
        OP1: false,
        OP2: false,
        OP3: false,
        OP4: false,
        OP5: false,
      });
    };
  }

  updateState = () => {
    console.log('updateState called');
    // Let pathChange = JSON.stringify(this.canvas.getPaths());
    this.setState(previousState => {
      return {
        path: JSON.stringify(this.canvas.getPaths()),
      };
    });
  };

  // {/* ~~~~~~~~~~ COVERT RESULTS TO DRAWING BOARD OBJECT [for (y) to (x,y) conversion -> check sample button's code]~~~~~~~~~~ */}

  // CONVERTING DATA FROM PRESET.JSON TO TRACE
  prepareTraceData(yCoordinates, Number, sampleColor) {
    console.log('Loaded Trace Path for Sample ' + Number + ' ; ' + sampleColor);
    var start =
      '{"path":{"id":' +
      Number +
      ',"color":"' +
      sampleColor +
      '","width":' +
      strokethickness_op +
      ',"data":[';
    var end = ']},"size":{"width":1366,"height":925},"drawer":null}';
    var x = 0;
    var sampleData = [];
    for (y in yCoordinates) {
      if (yCoordinates[y] >= 0) {
        var newCoordinate = '"' + x + ',' + yCoordinates[y] + '"';
        sampleData.push(newCoordinate);
        x = x + 5;
      }
    }
    var Path = start + sampleData + end;
    return Path;
  }

  // CONVERTING DATA FROM SERVER TO OUTPUT TRACE
  preparePathData(yCoordinates, Number, sampleColor) {
    console.log(
      "Processed data to Drawing Board's format for Result " +
        Number +
        ' ; ' +
        sampleColor,
    );
    var start =
      '{"path":{"id":' +
      Number +
      ',"color":"' +
      sampleColor +
      '","width":' +
      strokethickness_op +
      ',"data":[';
    var end = ']},"size":{"width":1366,"height":925},"drawer":null}';
    var x = 0;
    var sampleData = [];
    for (y in yCoordinates) {
      if (yCoordinates[y] >= 0) {
        var newCoordinate = '"' + x + ',' + yCoordinates[y] + '"';
        sampleData.push(newCoordinate);
        x = x + 20;
      }
    }
    var Path = start + sampleData + end;
    return Path;
  }

  // LOADING PRESET DATA FROM JSON
  loadPresetData(addTrace) {
    if (this.state.firstClickonSample) {
      //    -------- READING PROXY FROM FILE --------
      //   my_proxy.get('/config') //,{Read})
      // .then((responseSample) => {
      //     var convertJSON = responseSample.data.replace(/'/g, '"');
      //     var dataToJSON = JSON.parse(convertJSON);
      //     presetJSON.splice(0, 0, dataToJSON[0]);
      //     presetJSON.splice(1, 0, dataToJSON[1]);
      //     presetJSON.splice(2, 0, dataToJSON[2]);
      //     presetJSON.splice(3, 0, dataToJSON[3]);
      //     presetJSON.splice(4, 0, dataToJSON[4]);
      //     console.log('presetJSON' + presetJSON[0].Read);
      //   }
      //  ).catch(error => {console.log(error)});

      //Preset data initialization / Occurs only once
      function scaleYaxis(item, index) {
        var value = (item + 2) * 200;
        presetJSON[i].Read[index] = Math.round(value * 10) / 10;
      }
      for (var i = 0; i < presetJSON.length; i++) {
        presetJSON[i].Read.forEach(scaleYaxis);
        switch (i) {
          case 0:
            sample_color = samplecol[i];
            var sample1_tracePath = this.prepareTraceData(
              presetJSON[i].Read,
              i,
              sample_color,
            );
            addTrace.splice(i, 0, JSON.parse(sample1_tracePath));
            this.setState({
              tracePath: addTrace,
            });
            break;
          case 1:
            sample_color = samplecol[i];
            var sample2_tracePath = this.prepareTraceData(
              presetJSON[i].Read,
              i,
              sample_color,
            );
            addTrace.splice(i, 0, JSON.parse(sample2_tracePath));
            this.setState({
              tracePath: addTrace,
            });
            break;
          case 2:
            sample_color = samplecol[i];
            var sample3_tracePath = this.prepareTraceData(
              presetJSON[i].Read,
              i,
              sample_color,
            );
            addTrace.splice(i, 0, JSON.parse(sample3_tracePath));
            this.setState({
              tracePath: addTrace,
            });
            break;
          case 3:
            sample_color = samplecol[i];
            var sample4_tracePath = this.prepareTraceData(
              presetJSON[i].Read,
              i,
              sample_color,
            );
            addTrace.splice(i, 0, JSON.parse(sample4_tracePath));
            this.setState({
              tracePath: addTrace,
            });
            break;
          case 4:
            sample_color = samplecol[i];
            var sample5_tracePath = this.prepareTraceData(
              presetJSON[i].Read,
              i,
              sample_color,
            );
            addTrace.splice(i, 0, JSON.parse(sample5_tracePath));
            this.setState({
              tracePath: addTrace,
            });
            break;
          case 5:
            sample_color = samplecol[i];
            var sample6_tracePath = this.prepareTraceData(
              presetJSON[i].Read,
              i,
              sample_color,
            );
            addTrace.splice(i, 0, JSON.parse(sample6_tracePath));
            this.setState({
              tracePath: addTrace,
            });
            break;
        }
      }
      this.setState({
        firstClickonSample: false,
      });
      return addTrace;
    }
  }

  render() {
    var RNFS = require('react-native-fs');
    var _ = require('lodash');
    const progressCustomStyles = {
      backgroundColor: '#0d6b49',
      borderColor: 'grey',
      borderRadius: 20,
      width: 380,
      height: 40,
      barEasing: 'linear',
      barAnimationDuration: 1500,
      backgroundColorOnComplete: '#ffd60a',
    };
    var sample_color = '';
    var addTrace = [];
    {
      this.loadPresetData(addTrace);
    }
    var addOutput = [];
    var responsefromServer = [];
    var isOutput = this.state.ifOutput;
    var Link = 'https://en.wikipedia.org/wiki/'.concat(this.state.dnaName);
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<SAMPLE MODAL DISPLAY />~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <Modal
          animationType="slide"
          visible={this.state.sampleOverlay_visible}
          onRequestClose={() => {
            console.log('Modal displaying samples have been closed!');
          }}>
          <TouchableWithoutFeedback
            onPressIn={() => {
              console.log(
                'Sample Overlay is closed wihtout choosing any sample',
              );
              this.setState({
                sampleOverlay_visible: false,
                chosenSample: null,
                dnaName: null,
                dnaConfidence: null,
                dnaTime: null,
                ifOutput: false,
                firstClickonSample: false,
              });
            }}>
            <View style={styles.mainModalView}>
              <View style={styles.centeredView}>
                {/* ~~~~~~~~~~ SAMPLE 1 ~~~~~~~~~~ */}
                <TouchableWithoutFeedback
                  onPressIn={() => {
                    console.log(
                      'Sample Overlay is closed by pressing on Sample 1',
                    );
                    this.canvas.clear();
                    this.canvas.addPath(this.state.tracePath[0]);
                    this.setState({
                      sampleOverlay_visible: false,
                      chosenSample: 1,
                      dnaName: presetJSON[0].Name,
                      dnaConfidence: presetJSON[0].Confidence,
                      dnaTime: presetJSON[0].Time,
                      ifOutput: false,
                      firstClickonSample: false,
                    });
                  }}>
                  <View style={styles.modalView1}>
                    <Image source={sample1} style={{width: 370, height: 330}} />
                    <View style={{marginTop: 10}}>
                      <AwesomeButtonRick
                        type="secondary"
                        height={30}
                        borderRadius={30}
                        padding={10}
                        paddingTop={5}
                        elevation={3}
                        onPress={() => {
                          this.canvas.clear();
                          this.canvas.addPath(this.state.tracePath[0]);
                          this.setState({
                            sampleOverlay_visible: false,
                            chosenSample: 1,
                            dnaName: presetJSON[0].Name,
                            dnaConfidence: presetJSON[0].Confidence,
                            dnaTime: presetJSON[0].Time,
                            ifOutput: false,
                          });
                        }}>
                        {presetJSON[0].Name}
                      </AwesomeButtonRick>
                    </View>
                  </View>
                </TouchableWithoutFeedback>

                {/* ~~~~~~~~~~ SAMPLE 2 ~~~~~~~~~~ */}
                <TouchableWithoutFeedback
                  onPressIn={() => {
                    console.log(
                      'Sample Overlay is closed by pressing on Sample 2',
                    );
                    this.canvas.clear();
                    this.canvas.addPath(this.state.tracePath[1]);
                    this.setState({
                      sampleOverlay_visible: false,
                      chosenSample: 2,
                      dnaName: presetJSON[1].Name,
                      dnaConfidence: presetJSON[1].Confidence,
                      dnaTime: presetJSON[1].Time,
                      ifOutput: false,
                    });
                  }}>
                  <View style={styles.modalView2}>
                    <Image source={sample2} style={{width: 370, height: 330}} />
                    <View style={{marginTop: 10}}>
                      <AwesomeButtonRick
                        type="secondary"
                        height={30}
                        borderRadius={30}
                        padding={10}
                        paddingTop={5}
                        elevation={3}
                        onPress={() => {
                          this.canvas.clear();
                          this.canvas.addPath(this.state.tracePath[1]);
                          this.setState({
                            sampleOverlay_visible: false,
                            chosenSample: 2,
                            dnaName: presetJSON[1].Name,
                            dnaConfidence: presetJSON[1].Confidence,
                            dnaTime: presetJSON[1].Time,
                            ifOutput: false,
                          });
                        }}>
                        {presetJSON[1].Name}
                      </AwesomeButtonRick>
                    </View>
                  </View>
                </TouchableWithoutFeedback>

                {/* ~~~~~~~~~~ SAMPLE 3 ~~~~~~~~~~ */}
                <TouchableWithoutFeedback
                  onPressIn={() => {
                    console.log(
                      'Sample Overlay is closed by pressing on Sample 3',
                    );
                    this.canvas.clear();
                    this.canvas.addPath(this.state.tracePath[2]);
                    this.setState({
                      sampleOverlay_visible: false,
                      chosenSample: 3,
                      dnaName: presetJSON[2].Name,
                      dnaConfidence: presetJSON[2].Confidence,
                      dnaTime: presetJSON[2].Time,
                      ifOutput: false,
                    });
                  }}>
                  <View style={styles.modalView3}>
                    <Image source={sample3} style={{width: 370, height: 330}} />
                    <View style={{marginTop: 10}}>
                      <AwesomeButtonRick
                        type="secondary"
                        height={30}
                        borderRadius={30}
                        padding={10}
                        paddingTop={5}
                        elevation={3}
                        onPress={() => {
                          this.canvas.clear();
                          this.canvas.addPath(this.state.tracePath[2]);
                          this.setState({
                            sampleOverlay_visible: false,
                            chosenSample: 3,
                            dnaName: presetJSON[2].Name,
                            dnaConfidence: presetJSON[2].Confidence,
                            dnaTime: presetJSON[2].Time,
                            ifOutput: false,
                          });
                        }}>
                        {presetJSON[2].Name}
                      </AwesomeButtonRick>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>

              <View style={styles.centeredView}>
                {/* ~~~~~~~~~~ SAMPLE 4 ~~~~~~~~~~ */}
                <TouchableWithoutFeedback
                  onPressIn={() => {
                    console.log(
                      'Sample Overlay is closed by pressing on Sample 4',
                    );
                    this.canvas.clear();
                    this.canvas.addPath(this.state.tracePath[3]);
                    this.setState({
                      sampleOverlay_visible: false,
                      chosenSample: 4,
                      dnaName: presetJSON[3].Name,
                      dnaConfidence: presetJSON[3].Confidence,
                      dnaTime: presetJSON[3].Time,
                      ifOutput: false,
                    });
                  }}>
                  <View style={styles.modalView4}>
                    <Image source={sample4} style={{width: 370, height: 330}} />
                    <View style={{marginTop: 10}}>
                      <AwesomeButtonRick
                        type="secondary"
                        height={30}
                        borderRadius={30}
                        padding={10}
                        paddingTop={5}
                        elevation={3}
                        onPress={() => {
                          this.canvas.clear();
                          this.canvas.addPath(this.state.tracePath[3]);
                          this.setState({
                            sampleOverlay_visible: false,
                            chosenSample: 4,
                            dnaName: presetJSON[3].Name,
                            dnaConfidence: presetJSON[3].Confidence,
                            dnaTime: presetJSON[3].Time,
                            ifOutput: false,
                          });
                        }}>
                        {presetJSON[3].Name}
                      </AwesomeButtonRick>
                    </View>
                  </View>
                </TouchableWithoutFeedback>

                {/* ~~~~~~~~~~ SAMPLE 5 ~~~~~~~~~~ */}
                <TouchableWithoutFeedback
                  onPressIn={() => {
                    console.log(
                      'Sample Overlay is closed by pressing on Sample 5',
                    );
                    this.canvas.clear();
                    this.canvas.addPath(this.state.tracePath[4]);
                    this.setState({
                      sampleOverlay_visible: false,
                      chosenSample: 5,
                      dnaName: presetJSON[4].Name,
                      dnaConfidence: presetJSON[4].Confidence,
                      dnaTime: presetJSON[4].Time,
                      ifOutput: false,
                    });
                  }}>
                  <View style={styles.modalView5}>
                    <Image source={sample5} style={{width: 370, height: 330}} />
                    <View style={{marginTop: 10}}>
                      <AwesomeButtonRick
                        type="secondary"
                        height={30}
                        borderRadius={30}
                        padding={10}
                        paddingTop={5}
                        elevation={3}
                        onPress={() => {
                          this.canvas.clear();
                          this.canvas.addPath(this.state.tracePath[4]);
                          this.setState({
                            sampleOverlay_visible: false,
                            chosenSample: 5,
                            dnaName: presetJSON[4].Name,
                            dnaConfidence: presetJSON[4].Confidence,
                            dnaTime: presetJSON[4].Time,
                            ifOutput: false,
                          });
                        }}>
                        {presetJSON[4].Name}
                      </AwesomeButtonRick>
                    </View>
                  </View>
                </TouchableWithoutFeedback>

                {/* ~~~~~~~~~~ SAMPLE 6 ~~~~~~~~~~ */}
                <TouchableWithoutFeedback
                  onPressIn={() => {
                    console.log(
                      'Sample Overlay is closed by pressing on Sample 5',
                    );
                    this.canvas.clear();
                    this.canvas.addPath(this.state.tracePath[5]);
                    this.setState({
                      sampleOverlay_visible: false,
                      chosenSample: 6,
                      dnaName: presetJSON[5].Name,
                      dnaConfidence: presetJSON[5].Confidence,
                      dnaTime: presetJSON[5].Time,
                      ifOutput: false,
                    });
                  }}>
                  <View style={styles.modalView6}>
                    <Image
                      source={require('./Sample_Screens/Sample6.png')}
                      style={{width: 370, height: 330}}
                    />
                    <View style={{marginTop: 10}}>
                      <AwesomeButtonRick
                        type="secondary"
                        height={30}
                        borderRadius={30}
                        padding={10}
                        paddingTop={5}
                        elevation={3}
                        onPress={() => {
                          this.canvas.clear();
                          this.canvas.addPath(this.state.tracePath[5]);
                          this.setState({
                            sampleOverlay_visible: false,
                            chosenSample: 6,
                            dnaName: presetJSON[5].Name,
                            dnaConfidence: presetJSON[5].Confidence,
                            dnaTime: presetJSON[5].Time,
                            ifOutput: false,
                          });
                        }}>
                        {presetJSON[5].Name}
                      </AwesomeButtonRick>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>

              {/* ~~~~~~~~~~ BACK BUTTON ~~~~~~~~~~ */}
              <TouchableWithoutFeedback
                onPressIn={() => {
                  console.log(
                    'Sample Overlay is closed by pressing on Button View',
                  );
                  this.setState({
                    sampleOverlay_visible: false,
                    chosenSample: null,
                    dnaName: null,
                    dnaConfidence: null,
                    dnaTime: null,
                    ifOutput: false,
                  });
                }}>
                <View
                  style={{
                    flex: 0.18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 15,
                  }}>
                  <Button
                    type="clear"
                    icon={
                      <Icon
                        name="chevron-double-down"
                        size={60}
                        color="#606063"
                      />
                    }
                    onPress={() => {
                      console.log(
                        'Sample Overlay is closed by pressing on Button',
                      );
                      this.setState({
                        sampleOverlay_visible: false,
                        chosenSample: null,
                        dnaName: null,
                        dnaConfidence: null,
                        dnaTime: null,
                        ifOutput: false,
                      });
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<OUTPUT MODAL DISPLAY />~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <Modal
          animationType="slide"
          visible={this.state.outputOverlay_visible}
          onRequestClose={() => {
            console.log('Modal displaying output have been closed!');
          }}>
          <TouchableWithoutFeedback
            onPressIn={() => {
              console.log(
                'Output Overlay is closed wihtout choosing any output',
              );
              this.canvas.clear();
              this.setState({
                outputOverlay_visible: false,
                ifOutput: false,
                chosenOutput: null,
              });
            }}>
            <View style={styles.mainModalView1}>
              <View style={styles.centeredView1}>
                {/* ~~~~~~~~~~ OUTPUT 1 ~~~~~~~~~~ */}

                {this.state.OP1 && (
                  <View style={styles.outputCard}>
                    <View
                      style={{
                        width: 50,
                        height: 145,
                        backgroundColor: '#007AFF',
                        alignSelf: 'flex-start',
                        borderRadius: 20,
                      }}></View>
                    <TouchableWithoutFeedback
                      onPressIn={() => {
                        this.canvas.addPath(this.state.outputPath[0]);
                        console.log(
                          'Output Overlay is closed by choosing Output1 Text View',
                        );
                        this.setState({
                          outputOverlay_visible: false,
                          chosenOutput: 1,
                          dnaName: this.state.OP1_Name,
                          dnaConfidence: this.state.OP1_Confidence,
                          dnaTime: this.state.OP1_Time,
                          ifOutput: true,
                        });
                      }}>
                      <View
                        style={{
                          marginTop: 15,
                          width: 720,
                          height: 120,
                          flexDirection: 'column',
                          alignContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 22,
                            fontWeight: 'bold',
                            textAlign: 'center',
                          }}>
                          {this.state.OP1_Name}
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 15,
                            fontStyle: 'italic',
                            fontWeight: '100',
                            textAlign: 'center',
                            marginBottom: 10,
                          }}>
                          Name Tag of the DNA
                        </Text>
                        <View
                          style={{
                            marginTop: 5,
                            marginBottom: 5,
                            width: 720,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                          }}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 22,
                              fontWeight: '500',
                              textAlign: 'left',
                            }}>
                            Time: {this.state.OP1_Time}
                          </Text>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 22,
                              fontWeight: '500',
                              textAlign: 'left',
                            }}>
                            {' '}
                            Confidence: {this.state.OP1_Confidence}{' '}
                          </Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                    <View
                      style={{
                        marginTop: 10,
                        width: 400,
                        height: 120,
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontStyle: 'italic',
                          fontSize: 25,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          marginBottom: 10,
                        }}>
                        Similarity Meter
                      </Text>
                      <ProgressBarAnimated
                        {...progressCustomStyles}
                        value={this.state.OP1_Meter}
                      />
                    </View>
                    <View
                      style={{
                        width: 90,
                        borderLeftColor: '#606063',
                        height: 145,
                        justifyContent: 'center',
                        borderRadius: 20,
                      }}>
                      <Button
                        type="clear"
                        icon={
                          <Icon
                            name="chevron-right"
                            size={50}
                            color="#606063"
                          />
                        }
                        onPress={() => {
                          console.log(
                            'Output Overlay is closed by pressing on Output1 Button',
                          );
                          this.canvas.addPath(this.state.outputPath[0]);
                          this.setState({
                            outputOverlay_visible: false,
                            chosenOutput: 1,
                            dnaName: this.state.OP1_Name,
                            dnaConfidence: this.state.OP1_Confidence,
                            dnaTime: this.state.OP1_Time,
                            ifOutput: true,
                          });
                        }}
                      />
                    </View>
                  </View>
                )}

                {/* ~~~~~~~~~~ OUTPUT 2 ~~~~~~~~~~ */}

                {this.state.OP2 && (
                  <View style={styles.outputCard}>
                    <View
                      style={{
                        width: 50,
                        height: 145,
                        backgroundColor: '#FF2D55',
                        alignSelf: 'flex-start',
                        borderRadius: 20,
                      }}></View>
                    <TouchableWithoutFeedback
                      onPressIn={() => {
                        this.canvas.addPath(this.state.outputPath[1]);
                        console.log(
                          'id of path ' + this.state.outputPath[1].path.id,
                        );
                        console.log(
                          'Output Overlay is closed by choosing Output2 Text View',
                        );
                        this.setState({
                          outputOverlay_visible: false,
                          chosenOutput: 2,
                          dnaName: this.state.OP2_Name,
                          dnaConfidence: this.state.OP2_Confidence,
                          dnaTime: this.state.OP2_Time,
                          ifOutput: true,
                        });
                      }}>
                      <View
                        style={{
                          marginTop: 15,
                          width: 720,
                          height: 120,
                          flexDirection: 'column',
                          alignContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 22,
                            fontWeight: 'bold',
                            textAlign: 'center',
                          }}>
                          {this.state.OP2_Name}
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 15,
                            fontStyle: 'italic',
                            fontWeight: '100',
                            textAlign: 'center',
                            marginBottom: 10,
                          }}>
                          Name Tag of the DNA
                        </Text>
                        <View
                          style={{
                            marginTop: 5,
                            marginBottom: 5,
                            width: 720,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                          }}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 22,
                              fontWeight: '500',
                              textAlign: 'left',
                            }}>
                            Time: {this.state.OP2_Time}
                          </Text>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 22,
                              fontWeight: '500',
                              textAlign: 'left',
                            }}>
                            {' '}
                            Confidence: {this.state.OP2_Confidence}{' '}
                          </Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                    <View
                      style={{
                        marginTop: 10,
                        width: 400,
                        height: 120,
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontStyle: 'italic',
                          fontSize: 22,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          marginBottom: 10,
                        }}>
                        Similarity Meter
                      </Text>
                      <ProgressBarAnimated
                        {...progressCustomStyles}
                        value={this.state.OP2_Meter}
                      />
                    </View>
                    <View
                      style={{
                        width: 90,
                        borderLeftColor: '#606063',
                        height: 145,
                        justifyContent: 'center',
                        borderRadius: 20,
                      }}>
                      <Button
                        type="clear"
                        icon={
                          <Icon
                            name="chevron-right"
                            size={50}
                            color="#606063"
                          />
                        }
                        onPress={() => {
                          console.log(
                            'Output Overlay is closed by pressing on Output2 Button',
                          );
                          this.canvas.addPath(this.state.outputPath[1]);
                          this.setState({
                            outputOverlay_visible: false,
                            chosenOutput: 2,
                            dnaName: this.state.OP2_Name,
                            dnaConfidence: this.state.OP2_Confidence,
                            dnaTime: this.state.OP2_Time,
                            ifOutput: true,
                          });
                        }}
                      />
                    </View>
                  </View>
                )}
                {/* ~~~~~~~~~~ OUTPUT 3 ~~~~~~~~~~ */}

                {this.state.OP3 && (
                  <View style={styles.outputCard}>
                    <View
                      style={{
                        width: 50,
                        height: 145,
                        backgroundColor: '#AF52DE',
                        alignSelf: 'flex-start',
                        borderRadius: 20,
                      }}></View>
                    <TouchableWithoutFeedback
                      onPressIn={() => {
                        this.canvas.addPath(this.state.outputPath[2]);
                        console.log(
                          'id of path ' + this.state.outputPath[2].path.id,
                        );
                        console.log(
                          'Output Overlay is closed by choosing Output3 Text View',
                        );
                        this.setState({
                          outputOverlay_visible: false,
                          chosenOutput: 3,
                          dnaName: this.state.OP3_Name,
                          dnaConfidence: this.state.OP3_Confidence,
                          dnaTime: this.state.OP3_Time,
                          ifOutput: true,
                        });
                      }}>
                      <View
                        style={{
                          marginTop: 15,
                          width: 720,
                          height: 120,
                          flexDirection: 'column',
                          alignContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 22,
                            fontWeight: 'bold',
                            textAlign: 'center',
                          }}>
                          {this.state.OP3_Name}
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 15,
                            fontStyle: 'italic',
                            fontWeight: '100',
                            textAlign: 'center',
                            marginBottom: 10,
                          }}>
                          Name Tag of the DNA
                        </Text>
                        <View
                          style={{
                            marginTop: 5,
                            marginBottom: 5,
                            width: 720,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                          }}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 22,
                              fontWeight: '500',
                              textAlign: 'left',
                            }}>
                            Time: {this.state.OP3_Time}
                          </Text>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 22,
                              fontWeight: '500',
                              textAlign: 'left',
                            }}>
                            {' '}
                            Confidence: {this.state.OP3_Confidence}{' '}
                          </Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                    <View
                      style={{
                        marginTop: 10,
                        width: 400,
                        height: 120,
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontStyle: 'italic',
                          fontSize: 22,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          marginBottom: 10,
                        }}>
                        Similarity Meter
                      </Text>
                      <ProgressBarAnimated
                        {...progressCustomStyles}
                        value={this.state.OP3_Meter}
                      />
                    </View>
                    <View
                      style={{
                        width: 90,
                        borderLeftColor: '#606063',
                        height: 145,
                        justifyContent: 'center',
                        borderRadius: 20,
                      }}>
                      <Button
                        type="clear"
                        icon={
                          <Icon
                            name="chevron-right"
                            size={50}
                            color="#606063"
                          />
                        }
                        onPress={() => {
                          console.log(
                            'Output Overlay is closed by pressing on Output3 Button',
                          );
                          this.canvas.addPath(this.state.outputPath[2]);
                          this.setState({
                            outputOverlay_visible: false,
                            chosenOutput: 3,
                            dnaName: this.state.OP3_Name,
                            dnaConfidence: this.state.OP3_Confidence,
                            dnaTime: this.state.OP3_Time,
                            ifOutput: true,
                          });
                        }}
                      />
                    </View>
                  </View>
                )}

                {/* ~~~~~~~~~~ OUTPUT 4 ~~~~~~~~~~ */}
                {this.state.OP4 && (
                  <View style={styles.outputCard}>
                    <View
                      style={{
                        width: 50,
                        height: 145,
                        backgroundColor: '#FF9500',
                        alignSelf: 'flex-start',
                        borderRadius: 20,
                      }}></View>
                    <TouchableWithoutFeedback
                      onPressIn={() => {
                        this.canvas.addPath(this.state.outputPath[3]);
                        console.log(
                          'id of path ' + this.state.outputPath[3].path.id,
                        );
                        console.log(
                          'Output Overlay is closed by choosing Output4 Text View',
                        );
                        this.setState({
                          outputOverlay_visible: false,
                          chosenOutput: 4,
                          dnaName: this.state.OP4_Name,
                          dnaConfidence: this.state.OP4_Confidence,
                          dnaTime: this.state.OP4_Time,
                          ifOutput: true,
                        });
                      }}>
                      <View
                        style={{
                          marginTop: 15,
                          width: 720,
                          height: 120,
                          flexDirection: 'column',
                          alignContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 22,
                            fontWeight: 'bold',
                            textAlign: 'center',
                          }}>
                          {this.state.OP4_Name}
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 15,
                            fontStyle: 'italic',
                            fontWeight: '100',
                            textAlign: 'center',
                            marginBottom: 10,
                          }}>
                          Name Tag of the DNA
                        </Text>
                        <View
                          style={{
                            marginTop: 5,
                            marginBottom: 5,
                            width: 720,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                          }}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 22,
                              fontWeight: '500',
                              textAlign: 'left',
                            }}>
                            Time: {this.state.OP4_Time}
                          </Text>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 22,
                              fontWeight: '500',
                              textAlign: 'left',
                            }}>
                            {' '}
                            Confidence: {this.state.OP4_Confidence}{' '}
                          </Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                    <View
                      style={{
                        marginTop: 10,
                        width: 400,
                        height: 120,
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontStyle: 'italic',
                          fontSize: 22,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          marginBottom: 10,
                        }}>
                        Similarity Meter
                      </Text>
                      <ProgressBarAnimated
                        {...progressCustomStyles}
                        value={this.state.OP4_Meter}
                      />
                    </View>
                    <View
                      style={{
                        width: 90,
                        borderLeftColor: '#606063',
                        height: 145,
                        justifyContent: 'center',
                        borderRadius: 20,
                      }}>
                      <Button
                        type="clear"
                        icon={
                          <Icon
                            name="chevron-right"
                            size={50}
                            color="#606063"
                          />
                        }
                        onPress={() => {
                          console.log(
                            'Output Overlay is closed by pressing on Output4 Button',
                          );
                          this.canvas.addPath(this.state.outputPath[3]);
                          this.setState({
                            outputOverlay_visible: false,
                            chosenOutput: 4,
                            dnaName: this.state.OP4_Name,
                            dnaConfidence: this.state.OP4_Confidence,
                            dnaTime: this.state.OP4_Time,
                            ifOutput: true,
                          });
                        }}
                      />
                    </View>
                  </View>
                )}

                {/* ~~~~~~~~~~ OUTPUT 5 ~~~~~~~~~~ */}
                {this.state.OP5 && (
                  <View style={styles.outputCard}>
                    <View
                      style={{
                        width: 50,
                        height: 145,
                        backgroundColor: '#34C759',
                        alignSelf: 'flex-start',
                        borderRadius: 20,
                      }}></View>
                    <TouchableWithoutFeedback
                      onPressIn={() => {
                        this.canvas.addPath(this.state.outputPath[4]);
                        console.log(
                          'id of path ' + this.state.outputPath[4].path.id,
                        );
                        console.log(
                          'Output Overlay is closed by choosing Output5 Text View',
                        );
                        this.setState({
                          outputOverlay_visible: false,
                          chosenOutput: 5,
                          dnaName: this.state.OP5_Name,
                          dnaConfidence: this.state.OP5_Confidence,
                          dnaTime: this.state.OP5_Time,
                          ifOutput: true,
                        });
                      }}>
                      <View
                        style={{
                          marginTop: 15,
                          width: 720,
                          height: 120,
                          flexDirection: 'column',
                          alignContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 22,
                            fontWeight: 'bold',
                            textAlign: 'center',
                          }}>
                          {this.state.OP5_Name}
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 15,
                            fontStyle: 'italic',
                            fontWeight: '100',
                            textAlign: 'center',
                            marginBottom: 10,
                          }}>
                          Name Tag of the DNA
                        </Text>
                        <View
                          style={{
                            marginTop: 5,
                            marginBottom: 5,
                            width: 720,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                          }}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 22,
                              fontWeight: '500',
                              textAlign: 'left',
                            }}>
                            Time: {this.state.OP5_Time}
                          </Text>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 22,
                              fontWeight: '500',
                              textAlign: 'left',
                            }}>
                            {' '}
                            Confidence: {this.state.OP5_Confidence}{' '}
                          </Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                    <View
                      style={{
                        marginTop: 10,
                        width: 400,
                        height: 120,
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontStyle: 'italic',
                          fontSize: 22,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          marginBottom: 10,
                        }}>
                        Similarity Meter
                      </Text>
                      <ProgressBarAnimated
                        {...progressCustomStyles}
                        value={this.state.OP5_Meter}
                      />
                    </View>
                    <View
                      style={{
                        width: 90,
                        borderLeftColor: '#606063',
                        height: 145,
                        justifyContent: 'center',
                        borderRadius: 20,
                      }}>
                      <Button
                        type="clear"
                        icon={
                          <Icon
                            name="chevron-right"
                            size={50}
                            color="#606063"
                          />
                        }
                        onPress={() => {
                          console.log(
                            'Output Overlay is closed by pressing on Output5 Button',
                          );
                          this.canvas.addPath(this.state.outputPath[4]);
                          this.setState({
                            outputOverlay_visible: false,
                            chosenOutput: 5,
                            dnaName: this.state.OP5_Name,
                            dnaConfidence: this.state.OP5_Confidence,
                            dnaTime: this.state.OP5_Time,
                            ifOutput: true,
                          });
                        }}
                      />
                    </View>
                  </View>
                )}
              </View>
              {/* ~~~~~~~~~~ BACK BUTTON ~~~~~~~~~~ */}
              <TouchableWithoutFeedback
                onPressIn={() => {
                  this.canvas.clear();
                  console.log(
                    'Output Overlay is closed by pressing on Back Button View',
                  );
                  this.setState({
                    outputOverlay_visible: false,
                    chosenOutput: null,
                    ifOutput: false,
                  });
                }}>
                <View
                  style={{
                    flex: 0.08,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 15,
                  }}>
                  <Button
                    type="clear"
                    icon={
                      <Icon
                        name="chevron-double-down"
                        size={60}
                        color="#606063"
                      />
                    }
                    onPress={() => {
                      this.canvas.clear();
                      console.log(
                        'Output Overlay is closed by pressing on Back Button',
                      );
                      this.setState({
                        outputOverlay_visible: false,
                        chosenOutput: null,
                        ifOutput: false,
                      });
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<MAIN DISPLAY STARTING WITH DRAWING BOARD />~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

        <View style={{flex: 1, flexDirection: 'column'}}>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              height: 50,
            }}>
            {/* ~~~~~~~~~~ ERASER BUTTON ~~~~~~~~~~ */}
            <Button
              type="clear"
              icon={<Icon name="eraser" size={40} color="#8e8e93" />}
              onPress={() => {
                if (JSON.stringify(this.canvas.getPaths()) == '[]') {
                  Alert.alert(
                    'Oops, empty drawing board!',
                    'Your drawing board is clean and ready for you to start drawing! ',
                    [
                      {
                        text: 'Start Sketching',
                        onPress: () => {console.log('Start Sketching! Pressed');
                        this.setState({
                            outputOverlay_visible: false,
                            sampleOverlay_visible: false,
                            chosenOutput: null,
                            chosenSample: null,
                          });},
                      },
                      {
                        text: 'Show me some samples!',
                        onPress: () => {
                          console.log('Show me some samples - Pressed');
                          this.setState({
                            outputOverlay_visible: false,
                            sampleOverlay_visible: true,
                            chosenOutput: null,
                            chosenSample: null,
                          });
                        },
                        style: 'cancel',
                      },
                    ],
                    {cancelable: false},
                  );
                }
                this.canvas.clear();
                this.setState({
                  chosenOutput: null,
                  chosenSample: null,
                  ifOutput: false,
                });
              }}
            />
          </View>

          {/* OUTPUT INFORMATION DISPLAY */}
          {isOutput && (
            <View
              style={{
                flexDirection: 'row',
                height: 20,
                justifyContent: 'space-evenly',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  marginTop: -25,
                  paddingLeft: 10,
                  fontFamily: font_op,
                  color: {color_op},
                }}
                onPress={() => Linking.openURL(Link)}>
                DNA Name : {this.state.dnaName}{' '}
                <Icon name="search-web" size={22} color="#696969" />
              </Text>

              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontFamily: font_op,
                  marginTop: -25,
                  color: {color_op},
                }}>
                Confidence: {this.state.dnaConfidence}{' '}
              </Text>

              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontFamily: font_op,
                  marginTop: -25,
                  color: {color_op},
                  paddingRight: 50,
                }}>
                Time: {this.state.dnaTime} sec
              </Text>
            </View>
          )}

          {/* Y-AXIS SCALE READINGS */}
          <View
            style={{
              height: 770,
              padding: 15,
              marginTop: -20,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <View
              style={{flexDirection: 'column', alignContent: 'space-around'}}>
              <View style={{width: 10, height: 190}}>
                <Text
                  style={{
                    width: 20,
                    height: 50,
                    fontSize: 18,
                    color: '#8e8e93',
                  }}>
                  2
                </Text>
              </View>
              <View style={{width: 10, height: 190}}>
                <Text
                  style={{
                    width: 20,
                    height: 50,
                    fontSize: 18,
                    color: '#8e8e93',
                  }}>
                  1
                </Text>
              </View>
              <View style={{width: 10, height: 190}}>
                <Text
                  style={{
                    width: 20,
                    height: 50,
                    fontSize: 18,
                    color: '#8e8e93',
                  }}>
                  0
                </Text>
              </View>
              <View style={{width: 10, height: 190}}>
                <Text
                  style={{
                    width: 20,
                    height: 50,
                    fontSize: 18,
                    color: '#8e8e93',
                  }}>
                  -1
                </Text>
              </View>
              <View style={{width: 10, height: 30}}>
                <Text
                  style={{
                    width: 20,
                    height: 50,
                    fontSize: 18,
                    color: '#8e8e93',
                  }}>
                  -2
                </Text>
              </View>
            </View>

            <SketchCanvas
              // localSourceImage={{
              //   filename:
              //     '/Users/invenstphonethree/Documents/dna-demo-app/dnademo/background.png',
              //   directory: 'SketchCanvas.MAIN_BUNDLE',
              //   mode: 'ScaleToFill',
              // }}
              ref={ref => (this.canvas = ref)}
              style={{flex: 1}}
              strokeColor={strokecolor_main}
              strokeWidth={strokethickness_main}
              onStrokeStart={(x, y) => {
                console.log('x: ', x, ', y: ', y);
                this.setState({message: 'Start'});
              }}
              onStrokeChanged={(x, y) => {
                console.log('x: ', x, ', y: ', y);
                this.setState({message: 'Changed'});
              }}
              onStrokeEnd={() => {
                this.setState({message: 'End'});
                // this.setState({path: JSON.stringify(this.canvas.getPaths())});
                // this.props.onChangeinPath(JSON.stringify(this.canvas.getPaths()));
              }}
              onPathsChange={pathsCount => {
                // console.log('pathsCount', pathsCount);
              }}
            />
          </View>

          {/* X-AXIS SCALE READINGS */}
          <View style={{padding: 85, flexDirection: 'column'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{width: 220, height: 0}}>
                <Text
                  style={{
                    width: 50,
                    height: 20,
                    fontSize: 18,
                    color: '#8e8e93',
                    textAlign: 'left',
                  }}>
                  0
                </Text>
              </View>
              <View style={{width: 250, height: 0}}>
                <Text
                  style={{
                    width: 50,
                    height: 20,
                    fontSize: 18,
                    color: '#8e8e93',
                  }}>
                  0.1s
                </Text>
              </View>
              <View style={{width: 250, height: 0}}>
                <Text
                  style={{
                    width: 50,
                    height: 20,
                    fontSize: 18,
                    color: '#8e8e93',
                  }}>
                  0.2s
                </Text>
              </View>
              <View style={{width: 250, height: 0}}>
                <Text
                  style={{
                    width: 50,
                    height: 20,
                    fontSize: 18,
                    color: '#8e8e93',
                  }}>
                  0.3s
                </Text>
              </View>
              <View style={{width: 250, height: 0}}>
                <Text
                  style={{
                    width: 50,
                    height: 20,
                    fontSize: 18,
                    color: '#8e8e93',
                  }}>
                  0.4s
                </Text>
              </View>
              <View style={{width: 250, height: 0}}>
                <Text
                  style={{
                    width: 50,
                    height: 20,
                    fontSize: 18,
                    color: '#8e8e93',
                  }}>
                  0.5s
                </Text>
              </View>
            </View>

            <View
              style={{
                padding: 20,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<SampleButton />~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              <Button
                type="clear"
                icon={<Icon name="book" size={65} color="#007AFF" />}
                onPress={() => {
                  console.log('Sample Overlay is opened');
                  this.setState({
                    sampleOverlay_visible: true,
                    chosenSample: null,
                  });
                }}
              />

              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<AnalyzeButton />~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              <Button
                type="clear"
                icon={<Icon name="play-circle" size={65} color="#34C759" />}
                onPress={() => {
                  console.log('Output Overlay is opened');
                  switch (this.state.chosenOutput) {
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
                  if (this.state.chosenOutput == null) {
                    this.setState({
                      OP1: false,
                      OP2: false,
                      OP3: false,
                      OP4: false,
                      OP5: false,
                    });
                  }
                  this.setState({
                    outputOverlay_visible: true,
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

                  function scaleYaxistoDrawingValue(item, index) {
                    // console.log('item : '+ item);
                    var y_coordinate = item.split(',');
                    // console.log('y coordinate '+ y_coordinate[0]+' '+ y_coordinate[1]);
                    var value = roundTo((y_coordinate[1] / 100).toFixed(3), 2);
                    value = roundTo((value / 2).toFixed(3), 2);
                    value = value - 2;
                    value = Math.round(value * 100) / 100;
                    path_json[i].path.data[index] = y_coordinate[0].concat(
                      ',',
                      value,
                    );
                  }
                  for (var i = 0; i < path_json.length; i++) {
                    if(path_json[i].path.color == '#1C1C1E'){
                    path_json[i].path.data.forEach(scaleYaxistoDrawingValue);
                    }
                  }

                  var userInput = '[';
                  console.log(
                    'Number of lines drawn: ' + this.canvas.getPaths().length,
                  );
                  for (var k = 0; k < this.canvas.getPaths().length; k++) {
                    var j = k + 1;
                    if (j < this.canvas.getPaths().length) {
                      if (
                        userInput != '[' &&
                        this.canvas.getPaths()[j].path.color == '#1C1C1E' &&
                        this.canvas.getPaths()[k].path.color != '#1C1C1E'
                      ) {
                        userInput = userInput.concat(',');
                      }
                    }
                    if (this.canvas.getPaths()[k].path.color == '#1C1C1E') {
                      for (
                        var dataLength = 0;
                        dataLength < this.canvas.getPaths()[k].path.data.length;
                        dataLength++
                      ) {
                        userInput = userInput
                          .concat('[')
                          .concat(
                            this.canvas.getPaths()[k].path.data[dataLength],
                          )
                          .concat(']');
                        if (
                          dataLength !=
                          this.canvas.getPaths()[k].path.data.length - 1
                        ) {
                          userInput = userInput.concat(',');
                        }
                      }
                      var j = k + 1;
                      if (j < this.canvas.getPaths().length) {
                        if (this.canvas.getPaths()[j].path.color == '#1C1C1E') {
                          userInput = userInput.concat(',');
                        }
                      }
                    }
                  }
                  userInput = userInput.concat(']');
                  console.log('userInput: ' + userInput);
                  if (userInput != '[]') {
                    var Read = JSON.parse(userInput);
                  } else {
                    var Read = '[]';
                  }
                  console.log('dataToServer : ' + Read);

                  //var userInput = JSON.stringify(this.canvas.getPaths());
                  if (userInput == '[]') {
                    Alert.alert(
                      'Oops, empty drawing board!',
                      'If you dont know where to start, please checkout the sample traces by clicking on the blue icon. Happy tracing!!!',
                      [
                        {
                        text: 'Start Sketching',
                        onPress: () => {console.log('Start Sketching! Pressed');
                        this.canvas.clear();
                        this.setState({
                            outputOverlay_visible: false,
                            sampleOverlay_visible: false,
                            chosenOutput: null,
                            chosenSample:null,
                          });},
                      },
                        {
                          text: 'Show me some samples!',
                          onPress: () => {
                            this.canvas.clear();
                            console.log('Show me some samples - Pressed');
                            this.setState({
                              outputOverlay_visible: false,
                              sampleOverlay_visible: true,
                              chosenOutput: null,
                              chosenSample:null,
                            });
                          },
                          style: 'cancel',
                        },
                      ],
                      {cancelable: false},
                    );
                  }

                  //Incase we need to write a json file for the output recieved from the Server
                  // RNFS.writeFile(filePath, userInput, 'utf8')
                  //   .then(success => {
                  //     console.log('File written to device filesystem!');
                  //   })
                  //   .catch(err => {
                  //     console.log(err.message);
                  //   });

                  this.setState({
                    path: userInput,
                  });

                  {
                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<Backend Calls />~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                  }

                  //Fetch results from server only when user clears screen or doesn't want any output; else show already fetched result
                  if (this.state.chosenOutput == null && userInput != '[]') {
                    console.log('Server is being hit!');
                    my_proxy
                      .post('/analyze', {Read})
                      .then(response => {
                        console.log(
                          'respone.data: ' + response.data,
                        );
                        if (
                          userInput != '[]' &&
                          response.data == 'error: query to short\n'
                        ) {
                          Alert.alert(
                            'Scribble too short!',
                            'Just draw a longer one!',
                            [
                              {
                                text: 'Okay',
                                onPress: () => {
                                  this.canvas.clear(),
                                    console.log(
                                      'Okay Pressed-Scribble too short',
                                    ),
                                    this.setState({
                                      outputOverlay_visible: false,
                                      chosenOutput: null,
                                      chosenSample: null,
                                    });
                                },
                              },
                            ],
                            {cancelable: false},
                          );
                          this.setState({
                            responseJSON: responsefromServer,
                            chosenOutput: null,
                            chosenSample: null,
                          });
                          // break;
                        } else {
                          var dataToJSON = '';
                          if (response.data != '') {
                            var convertJSON = response.data.replace(/'/g, '"');
                            dataToJSON = JSON.parse(convertJSON);
                          } else {
                            console.log('Empty response from server!');
                          }
                          resetResponse();
                          for (var i = 0; i < dataToJSON.length; i++) {
                            responsefromServer.splice(i, 0, dataToJSON[i]);
                          }
                          // console.log(
                          //   'length of dataToJSON(responseFromServer): ' +
                          //     dataToJSON.length,
                          // );

                          //No results -> Handling
                          if (dataToJSON.length == 0) {
                            Alert.alert(
                              'No Match Found',
                              'Go back and try again or checkout some example traces!',
                              [
                                {
                                  text: "Okay, I'll try again",
                                  onPress: () => {
                                    this.canvas.clear(),
                                      console.log('OK Pressed'),
                                      this.setState({
                                        outputOverlay_visible: false,
                                        chosenOutput: null,
                                        chosenSample: null,
                                      });
                                  },
                                },
                                {
                                  text: 'Show me some samples!',
                                  onPress: () => {
                                    console.log(
                                      'Show me some samples - Pressed',
                                    );
                                    this.setState({
                                      outputOverlay_visible: false,
                                      sampleOverlay_visible: true,
                                      chosenOutput: null,
                                      chosenSample: null,
                                    });
                                  },
                                  style: 'cancel',
                                },
                              ],
                              {cancelable: false},
                            );
                          } else {
                            function scaleYaxis(item, index) {
                              var value = (item + 2) * 200;
                              responsefromServer[i].Read[index] =
                                Math.round(value * 10) / 10;
                            }
                            for (var i = 0; i < dataToJSON.length; i++) {
                              responsefromServer[i].Read.forEach(scaleYaxis);
                              switch (i) {
                                case 0:
                                  sample_color = resultcol[i];
                                  var name_string = responsefromServer[i].Name;
                                  var time_string = responsefromServer[i].Time;
                                  var confidence_string =
                                    responsefromServer[i].Confidence;
                                  var meter_string = confidence_string * 100;
                                  var outPut1 = this.preparePathData(
                                    responsefromServer[i].Read,
                                    i,
                                    sample_color,
                                  );
                                  addOutput.splice(i, 0, JSON.parse(outPut1));
                                  this.setState({
                                    outputPath: addOutput,
                                    OP1_Name: name_string,
                                    OP1_Time: time_string,
                                    OP1_Confidence: confidence_string,
                                    OP1_Meter: meter_string,
                                    OP1: true,
                                  });
                                  break;
                                case 1:
                                  sample_color = resultcol[i];
                                  var name_string = responsefromServer[i].Name;
                                  var time_string = responsefromServer[i].Time;
                                  var confidence_string =
                                    responsefromServer[i].Confidence;
                                  var meter_string = confidence_string * 100;
                                  var outPut2 = this.preparePathData(
                                    responsefromServer[i].Read,
                                    i,
                                    sample_color,
                                  );
                                  addOutput.splice(i, 0, JSON.parse(outPut2));
                                  this.setState({
                                    outputPath: addOutput,
                                    OP2_Name: name_string,
                                    OP2_Time: time_string,
                                    OP2_Confidence: confidence_string,
                                    OP2_Meter: meter_string,
                                    OP2: true,
                                  });
                                  break;
                                case 2:
                                  sample_color = resultcol[i];
                                  var name_string = responsefromServer[i].Name;
                                  var time_string = responsefromServer[i].Time;
                                  var confidence_string =
                                    responsefromServer[i].Confidence;
                                  var meter_string = confidence_string * 100;
                                  var outPut3 = this.preparePathData(
                                    responsefromServer[i].Read,
                                    i,
                                    sample_color,
                                  );
                                  addOutput.splice(i, 0, JSON.parse(outPut3));
                                  this.setState({
                                    outputPath: addOutput,
                                    OP3_Name: name_string,
                                    OP3_Time: time_string,
                                    OP3_Confidence: confidence_string,
                                    OP3_Meter: meter_string,
                                    OP3: true,
                                  });
                                  break;
                                case 3:
                                  sample_color = resultcol[i];
                                  var name_string = responsefromServer[i].Name;
                                  var time_string = responsefromServer[i].Time;
                                  var confidence_string =
                                    responsefromServer[i].Confidence;
                                  var meter_string = confidence_string * 100;
                                  var outPut4 = this.preparePathData(
                                    responsefromServer[i].Read,
                                    i,
                                    sample_color,
                                  );
                                  addOutput.splice(i, 0, JSON.parse(outPut4));
                                  this.setState({
                                    outputPath: addOutput,
                                    OP4_Name: name_string,
                                    OP4_Time: time_string,
                                    OP4_Confidence: confidence_string,
                                    OP4_Meter: meter_string,
                                    OP4: true,
                                  });
                                  break;
                                case 4:
                                  sample_color = resultcol[i];
                                  var name_string = responsefromServer[i].Name;
                                  var time_string = responsefromServer[i].Time;
                                  var confidence_string =
                                    responsefromServer[i].Confidence;
                                  var meter_string = confidence_string * 100;
                                  var outPut5 = this.preparePathData(
                                    responsefromServer[i].Read,
                                    i,
                                    sample_color,
                                  );
                                  addOutput.splice(i, 0, JSON.parse(outPut5));
                                  this.setState({
                                    outputPath: addOutput,
                                    OP5_Name: name_string,
                                    OP5_Time: time_string,
                                    OP5_Confidence: confidence_string,
                                    OP5_Meter: meter_string,
                                    OP5: true,
                                  });
                                  break;
                              }
                            }
                          }
                        }
                      })
                      .catch(error => {
                        console.log('Error from Response: ' + error);
                        if (userInput != '[]') {
                          Alert.alert(
                            'Network Error',
                            'Make sure you are connected to the internet or check if the server is running!',
                            [
                              {
                                text: 'Okay',
                                onPress: () => {
                                  this.canvas.clear(),
                                    console.log(
                                      'Okay Pressed-From Network Error Alert',
                                    ),
                                    this.setState({
                                      outputOverlay_visible: false,
                                      chosenOutput: null,
                                      chosenSample: null,
                                    });
                                },
                              },
                            ],
                            {cancelable: false},
                          );
                          this.setState({
                            responseJSON: responsefromServer,
                            chosenOutput: null,
                            chosenSample: null,
                          });
                        }
                      });
                  }
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  strokeColorButton: {
    marginHorizontal: 15,
    justifyContent: 'center',
    marginVertical: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8e8e93',
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 50,
    width: 50,
    // backgroundColor: '#f05454',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 25,
  },
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // alignItems: 'center',
    marginTop: 40,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 15,
    // backgroundColor: 'f2f2f7',
  },
  centeredView1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    // alignItems: 'center',
    marginTop: 20,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 10,
    // backgroundColor: 'f2f2f7',
  },
  mainModalView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f7',
    justifyContent: 'space-between',
    borderRadius: 50,
    // alignItems: 'center',
    marginTop: 25,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 10,
    // backgroundColor: 'green',
  },
  mainModalView1: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f7',
    justifyContent: 'space-between',
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 25,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 10,
    // backgroundColor: 'green',
  },
  outputCard: {
    flexDirection: 'row',
    // justifyContent: '',
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
    width: 1280,
    height: 145,
    // marginTop: 10,
  },
  modalView1: {
    // margin: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#2d70f7',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
    width: 420,
    height: 420,
    // borderColor: '#007AFF',
    // borderWidth: 2
  },
  modalView2: {
    // margin: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#FF2D55',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
    width: 420,
    height: 420,
    // borderColor: '#007AFF',
    // borderWidth: 2
  },
  modalView3: {
    // margin: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#AF52DE',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
    width: 420,
    height: 420,
    // borderColor: '#007AFF',
    // borderWidth: 2
  },
  modalView4: {
    // margin: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#FF9500',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
    width: 420,
    height: 420,
    // borderColor: '#007AFF',
    // borderWidth: 2
  },
  modalView5: {
    // margin: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#34C759',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
    width: 420,
    height: 420,
    // borderColor: '#007AFF',
    // borderWidth: 2
  },
  modalView6: {
    // margin: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#5856d6',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
    width: 420,
    height: 420,
    // borderColor: '#007AFF',
    // borderWidth: 2
  },
  openButton: {
    backgroundColor: '#4b4d4f',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    paddingTop: 5,
    marginTop: 12,
  },
  textStyle: {
    color: 'white',
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('DrawingBoard', () => DrawingBoard);
