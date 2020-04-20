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
} from 'react-native';
import {Button} from 'react-native-elements';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import presetJSON from './Sample_Screens/Preset.json';
import {AnalyzeButton} from './AnalyzeButton';
import {SampleButton} from './SampleButton';

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';

// Imports and constants for backend
import axios from 'axios';
import { thisExpression } from '@babel/types';
const serv = 'http://127.0.0.1:5000';
const my_proxy = axios.create({
  baseURL: serv,
});

// ios-black 1C1C1E
// ios-blue 007AFF
// ios-pink FF2D55
// ios-purple AF52DE
// ios-orange FF9500
// ios-green 34C759

export class DrawingBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#1C1C1E',
      thickness: 12,
      message: '',
      chosenSample: null,
      chosenOutput: null,
      path: null,
      firstClickonSample: true,
      dnaName: null,
      dnaConfidence: null,
      dnaTime: null,
      sampleOverlay_visible: false,
      outputOverlay_visible: false,
      tracePath: null,
      outputPath: null,
      responseJSON: '',
      progressBar_color: null,
    };
  }

  updateState = () => {
    console.log('updateState called');
    // let pathChange = JSON.stringify(this.canvas.getPaths());
    this.setState(previousState => {
      return {
        path: JSON.stringify(this.canvas.getPaths()),
      };
    });
  };

  // {/* ~~~~~~~~~~ COVERT RESULTS TO DRAWING BOARD OBJECT [for (y) to (x,y) conversion -> check sample button's code]~~~~~~~~~~ */}

  preparePathData(yCoordinates, Number, sampleColor) {
    console.log(
      "Converted data to drawing board's scale for UserInput/Sample: " +
        Number +
        ' ; ' +
        sampleColor,
    );
    var start =
      '{"path":{"id":' +
      Number +
      ',"color":"' +
      sampleColor +
      '","width":18,"data":[';
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

  render() {
    var RNFS = require('react-native-fs');
    var _ = require('lodash');
    const progressCustomStyles = {
      backgroundColor: 'black',
      borderColor: 'grey', 
      borderRadius: 20,
      width: 380,
      height: 40,
      barEasing: 'linear',
      barAnimationDuration: 1500,
    };
    var sample_color = '';
    // var presetJSON = [];
    var addTrace = [];
    var addOutput = [];
    var responsefromServer = [];
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<SAMPLE MODAL DISPLAY />~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
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
                    });
                  }}>
                  <View style={styles.modalView1}>
                    <Image
                      source={require('./Sample_Screens/Sample1.png')}
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
                          this.canvas.addPath(this.state.tracePath[0]);
                          this.setState({
                            sampleOverlay_visible: false,
                            chosenSample: 1,
                            dnaName: presetJSON[0].Name,
                            dnaConfidence: presetJSON[0].Confidence,
                            dnaTime: presetJSON[0].Time,
                          });
                        }}>
                        SAMPLE 1
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
                    });
                  }}>
                  <View style={styles.modalView2}>
                    <Image
                      source={require('./Sample_Screens/Sample2.png')}
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
                          this.canvas.addPath(this.state.tracePath[1]);
                          this.setState({
                            sampleOverlay_visible: false,
                            chosenSample: 2,
                            dnaName: presetJSON[1].Name,
                            dnaConfidence: presetJSON[1].Confidence,
                            dnaTime: presetJSON[1].Time,
                          });
                        }}>
                        SAMPLE 2
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
                    });
                  }}>
                  <View style={styles.modalView3}>
                    <Image
                      source={require('./Sample_Screens/Sample3.png')}
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
                          this.canvas.addPath(this.state.tracePath[2]);
                          this.setState({
                            sampleOverlay_visible: false,
                            chosenSample: 3,
                            dnaName: presetJSON[2].Name,
                            dnaConfidence: presetJSON[2].Confidence,
                            dnaTime: presetJSON[2].Time,
                          });
                        }}>
                        SAMPLE 3
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
                    });
                  }}>
                  <View style={styles.modalView4}>
                    <Image
                      source={require('./Sample_Screens/Sample4.png')}
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
                          this.canvas.addPath(this.state.tracePath[3]);
                          this.setState({
                            sampleOverlay_visible: false,
                            chosenSample: 4,
                            dnaName: presetJSON[3].Name,
                            dnaConfidence: presetJSON[3].Confidence,
                            dnaTime: presetJSON[3].Time,
                          });
                        }}>
                        SAMPLE 4
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
                    });
                  }}>
                  <View style={styles.modalView5}>
                    <Image
                      source={require('./Sample_Screens/Sample5.png')}
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
                          this.canvas.addPath(this.state.tracePath[4]);
                          this.setState({
                            sampleOverlay_visible: false,
                            chosenSample: 5,
                            dnaName: presetJSON[4].Name,
                            dnaConfidence: presetJSON[4].Confidence,
                            dnaTime: presetJSON[4].Time,
                          });
                        }}>
                        SAMPLE 5
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
                        name="chevron-triple-down"
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
                      });
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<OUTPUT MODAL DISPLAY />~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
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
              this.setState({outputOverlay_visible: false});
            }}>
            <View style={styles.mainModalView1}>
            <View style={styles.centeredView1}>

              {/* ~~~~~~~~~~ OUTPUT 1 ~~~~~~~~~~ */}
                <View style={styles.outputCard}>
                <View style={{width: 70, height:145, backgroundColor: '#007AFF', alignSelf: 'flex-start', borderRadius: 20 }}></View>
                <TouchableWithoutFeedback
                  onPressIn={() => {
                  this.canvas.addPath(this.state.outputPath[0]);
                  console.log('ID of path '+ this.state.outputPath[0].path.id);
                  console.log('Output Overlay is closed by choosing Output1 Text View',);
                  this.setState({outputOverlay_visible: false, chosenOutput: 1});
                }}>
                <View style={{marginTop: 15, width: 720, height: 120, flexDirection: 'column', alignContent: 'center'}}>
              <Text style={{color: 'black', fontSize: 40, fontWeight: 'bold', textAlign: 'center',}}>Name:</Text>
                  <Text style={{color: 'black', fontSize: 15, fontStyle: 'italic', fontWeight: '100', textAlign: 'center', marginBottom: 10}}>Name Tag of the DNA</Text>
                  <View style={{ marginTop: 5, marginBottom: 5, width: 720, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <Text style={{color: 'black', fontSize: 25, fontWeight: '500', textAlign: 'left',}}>Time:</Text>
                    <Text style={{color: 'black', fontSize: 25, fontWeight: '500', textAlign: 'left',}}> Confidence: </Text>
                  </View>
                </View>
                </TouchableWithoutFeedback>
                  <View style={{marginTop: 10, width: 400, height: 120, justifyContent: 'center', flexDirection: 'column'}}>
                    <Text style={{color: 'black', fontStyle: 'italic' ,fontSize: 25, fontWeight: 'bold', textAlign: 'center' ,marginBottom: 10,}}>Similarity Meter</Text>
                    <ProgressBarAnimated {...progressCustomStyles}
                      value={70}
                    />
                  </View>
                  <View style={{width: 90, borderLeftColor: '#606063' , height:145, justifyContent: 'center', borderRadius: 20 }}>
                  <Button
                type="clear"
                icon={
                  <Icon name="chevron-right" size={50} color="#606063" />
                }
                onPress={() => {
                  console.log('Output Overlay is closed by pressing on Output1 Button');
                  this.canvas.addPath(this.state.outputPath[0]);
                  this.setState({
                    outputOverlay_visible: false,
                    chosenOutput: 1,
                  });
                }}
              />
                </View>
                </View>

              {/* ~~~~~~~~~~ OUTPUT 2 ~~~~~~~~~~ */}
              <View style={styles.outputCard}>
                <View style={{width: 70, height:145, backgroundColor: '#FF2D55', alignSelf: 'flex-start', borderRadius: 20 }}></View>
                <TouchableWithoutFeedback
                  onPressIn={() => {
                    this.canvas.addPath(this.state.outputPath[1]);
                    console.log('id of path '+this.state.outputPath[1].path.id);
                  console.log('Output Overlay is closed by choosing Output2 Text View',);
                  this.setState({outputOverlay_visible: false, chosenOutput: 2});
                }}>
                <View style={{marginTop: 15, width: 720, height: 120, flexDirection: 'column', alignContent: 'center'}}>
              <Text style={{color: 'black', fontSize: 40, fontWeight: 'bold', textAlign: 'center',}}>DNA NAME</Text>
                  <Text style={{color: 'black', fontSize: 15, fontStyle: 'italic', fontWeight: '100', textAlign: 'center', marginBottom: 10}}>Name Tag of the DNA</Text>
                  <View style={{ marginTop: 5, marginBottom: 5, width: 720, flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Text style={{color: 'black', fontSize: 25, fontWeight: '500', textAlign: 'left',}}>Time: </Text>
                    <Text style={{color: 'black', fontSize: 25, fontWeight: '500', textAlign: 'left',}}> Confidence: </Text>
                  </View>
                </View>
                </TouchableWithoutFeedback>
                  <View style={{marginTop: 10, width: 400, height: 120, justifyContent: 'center', flexDirection: 'column'}}>
                    <Text style={{color: 'black', fontStyle: 'italic' ,fontSize: 25, fontWeight: 'bold', textAlign: 'center' ,marginBottom: 10,}}>Similarity Meter</Text>
                    <ProgressBarAnimated {...progressCustomStyles}
                      value={70}
                    />
                  </View>
                  <View style={{width: 90, borderLeftColor: '#606063' , height:145, justifyContent: 'center', borderRadius: 20 }}>
                  <Button
                type="clear"
                icon={
                  <Icon name="chevron-right" size={50} color="#606063" />
                }
                onPress={() => {
                  console.log('Output Overlay is closed by pressing on Output2 Button');
                  this.canvas.addPath(this.state.outputPath[1]);
                  this.setState({
                    outputOverlay_visible: false,
                    chosenOutput: 2,
                  });
                }}
              />
                </View>
                </View>

              {/* ~~~~~~~~~~ OUTPUT 3 ~~~~~~~~~~ */}
              <View style={styles.outputCard}>
                <View style={{width: 70, height:145, backgroundColor: '#AF52DE', alignSelf: 'flex-start', borderRadius: 20 }}></View>
                <TouchableWithoutFeedback
                  onPressIn={() => {
                    this.canvas.addPath(this.state.outputPath[2]);
                    console.log('id of path '+this.state.outputPath[2].path.id);
                  console.log('Output Overlay is closed by choosing Output3 Text View',);
                  this.setState({outputOverlay_visible: false, chosenOutput: 3});
                }}>
                <View style={{marginTop: 15, width: 720, height: 120, flexDirection: 'column', alignContent: 'center'}}>
                  <Text style={{color: 'black', fontSize: 40, fontWeight: 'bold', textAlign: 'center',}}>DNA NAME</Text>
                  <Text style={{color: 'black', fontSize: 15, fontStyle: 'italic', fontWeight: '100', textAlign: 'center', marginBottom: 10}}>Name Tag of the DNA</Text>
                  <View style={{ marginTop: 5, marginBottom: 5, width: 720, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <Text style={{color: 'black', fontSize: 25, fontWeight: '500', textAlign: 'left',}}>Time:</Text>
                    <Text style={{color: 'black', fontSize: 25, fontWeight: '500', textAlign: 'left',}}> Confidence: </Text>
                  </View>
                </View>
                </TouchableWithoutFeedback>
                  <View style={{marginTop: 10, width: 400, height: 120, justifyContent: 'center', flexDirection: 'column'}}>
                    <Text style={{color: 'black', fontStyle: 'italic' ,fontSize: 25, fontWeight: 'bold', textAlign: 'center' ,marginBottom: 10,}}>Similarity Meter</Text>
                    <ProgressBarAnimated {...progressCustomStyles}
                      value={70}
                    />
                  </View>
                  <View style={{width: 90, borderLeftColor: '#606063' , height:145, justifyContent: 'center', borderRadius: 20 }}>
                  <Button
                type="clear"
                icon={
                  <Icon name="chevron-right" size={50} color="#606063" />
                }
                onPress={() => {
                  console.log('Output Overlay is closed by pressing on Output3 Button');
                  this.canvas.addPath(this.state.outputPath[2]);
                  this.setState({
                    outputOverlay_visible: false,
                    chosenOutput: 3,
                  });
                }}
              />
                </View>
                </View>

              {/* ~~~~~~~~~~ OUTPUT 4 ~~~~~~~~~~ */}
              <View style={styles.outputCard}>
                <View style={{width: 70, height:145, backgroundColor: '#FF9500', alignSelf: 'flex-start', borderRadius: 20 }}></View>
                <TouchableWithoutFeedback
                  onPressIn={() => {
                    this.canvas.addPath(this.state.outputPath[3]);
                    console.log('id of path '+this.state.outputPath[3].path.id);
                  console.log('Output Overlay is closed by choosing Output4 Text View',);
                  this.setState({outputOverlay_visible: false, chosenOutput: 4});
                }}>
                <View style={{marginTop: 15, width: 720, height: 120, flexDirection: 'column', alignContent: 'center'}}>
                  <Text style={{color: 'black', fontSize: 40, fontWeight: 'bold', textAlign: 'center',}}>DNA NAME</Text>
                  <Text style={{color: 'black', fontSize: 15, fontStyle: 'italic', fontWeight: '100', textAlign: 'center', marginBottom: 10}}>Name Tag of the DNA</Text>
                  <View style={{ marginTop: 5, marginBottom: 5, width: 720, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <Text style={{color: 'black', fontSize: 25, fontWeight: '500', textAlign: 'left',}}>Time:</Text>
                    <Text style={{color: 'black', fontSize: 25, fontWeight: '500', textAlign: 'left',}}> Confidence: </Text>
                  </View>
                </View>
                </TouchableWithoutFeedback>
                  <View style={{marginTop: 10, width: 400, height: 120, justifyContent: 'center', flexDirection: 'column'}}>
                    <Text style={{color: 'black', fontStyle: 'italic' ,fontSize: 25, fontWeight: 'bold', textAlign: 'center' ,marginBottom: 10,}}>Similarity Meter</Text>
                    <ProgressBarAnimated {...progressCustomStyles}
                      value={70}
                    />
                  </View>
                  <View style={{width: 90, borderLeftColor: '#606063' , height:145, justifyContent: 'center', borderRadius: 20 }}>
                  <Button
                type="clear"
                icon={
                  <Icon name="chevron-right" size={50} color="#606063" />
                }
                onPress={() => {
                  console.log('Output Overlay is closed by pressing on Output4 Button');
                  this.canvas.addPath(this.state.outputPath[3]);
                  this.setState({
                    outputOverlay_visible: false,
                    chosenOutput: 4,
                  });
                }}
              />
                </View>
                </View>

              {/* ~~~~~~~~~~ OUTPUT 5 ~~~~~~~~~~ */}
              <View style={styles.outputCard}>
                <View style={{width: 70, height:145, backgroundColor: '#34C759', alignSelf: 'flex-start', borderRadius: 20 }}></View>
                <TouchableWithoutFeedback
                  onPressIn={() => {
                    this.canvas.addPath(this.state.outputPath[4]);
                    console.log('id of path '+this.state.outputPath[4].path.id);
                  console.log('Output Overlay is closed by choosing Output5 Text View',);
                  this.setState({outputOverlay_visible: false, chosenOutput: 5});
                }}>
                <View style={{marginTop: 15, width: 720, height: 120, flexDirection: 'column', alignContent: 'center'}}>
                  <Text style={{color: 'black', fontSize: 40, fontWeight: 'bold', textAlign: 'center',}}>DNA NAME</Text>
                  <Text style={{color: 'black', fontSize: 15, fontStyle: 'italic', fontWeight: '100', textAlign: 'center', marginBottom: 10}}>Name Tag of the DNA</Text>
                  <View style={{ marginTop: 5, marginBottom: 5, width: 720, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <Text style={{color: 'black', fontSize: 25, fontWeight: '500', textAlign: 'left',}}>Time:</Text>
                    <Text style={{color: 'black', fontSize: 25, fontWeight: '500', textAlign: 'left',}}> Confidence: </Text>
                  </View>
                </View>
                </TouchableWithoutFeedback>
                  <View style={{marginTop: 10, width: 400, height: 120, justifyContent: 'center', flexDirection: 'column'}}>
                    <Text style={{color: 'black', fontStyle: 'italic' ,fontSize: 25, fontWeight: 'bold', textAlign: 'center' ,marginBottom: 10,}}>Similarity Meter</Text>
                    <ProgressBarAnimated {...progressCustomStyles}
                      value={70}
                    />
                  </View>
                  <View style={{width: 90, borderLeftColor: '#606063' , height:145, justifyContent: 'center', borderRadius: 20 }}>
                  <Button
                type="clear"
                icon={
                  <Icon name="chevron-right" size={50} color="#606063" />
                }
                onPress={() => {
                  console.log('Output Overlay is closed by pressing on Output5 Button');
                  this.canvas.addPath(this.state.outputPath[4]);
                  this.setState({
                    outputOverlay_visible: false,
                    chosenOutput: 5,
                  });
                }}
              />
                </View>
                </View>
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
                  <Icon name="chevron-triple-down" size={60} color="#606063" />
                }
                onPress={() => {
                  this.canvas.clear();
                  console.log('Output Overlay is closed by pressing on Back Button');
                  this.setState({
                    outputOverlay_visible: false,
                    chosenOutput: null,
                  });
                }}
              />
            </View>
          </TouchableWithoutFeedback>
          </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<MAIN DISPLAY STARTING WITH DRAWING BOARD />~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

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
              icon={<Icon name="eraser" size={30} color="#8e8e93" />}
              onPress={() => {
                if(JSON.stringify(this.canvas.getPaths()) == '[]'){
                  Alert.alert(
                    'Oops, empty drawing board!',
                    'Your drawing board is clean and ready for you to start drawing! ',
                    [{text: 'Start Sketching', onPress: () => console.log('OK Pressed')}],
                    {cancelable: false},
                  );
                }
                this.canvas.clear();
              }}
            />
          </View>
          <SketchCanvas
            localSourceImage={{
              filename:
                '/Users/invenstphonethree/Documents/dna-demo-app/dnademo/background.png',
              directory: 'SketchCanvas.MAIN_BUNDLE',
              mode: 'ScaleToFill',
            }}
            text={[
              {
                text: '<----------- Time (milliseconds) ----------->',
                font: 'Zapfino',
                fontSize: 15,
                position: {x: 441, y: 843},
                anchor: {x: 0, y: 0},
                overlay: 'SketchOnText',
                coordinate: 'Absolute',
                alignment: 'Center',
                fontColor: 'grey',
              },
              // {
              //   text: '2000',
              //   font: 'Zapfino',
              //   fontSize: 12,
              //   position: {x: 1300, y: 888},
              //   anchor: {x: 0, y: 0},
              //   overlay: 'SketchOnText',
              //   coordinate: 'Absolute',
              //   alignment: 'Center',
              //   fontColor: 'grey',
              // },
              // {
              //   text: '0',
              //   font: 'Zapfino',
              //   fontSize: 12,
              //   position: {x: 10, y: 888},
              //   anchor: {x: 0, y: 0},
              //   overlay: 'SketchOnText',
              //   coordinate: 'Absolute',
              //   alignment: 'Center',
              //   fontColor: 'grey',
              // },
              // { text: '-2', font: 'Zapfino', fontSize: 12, position: { x: 10, y: 838 }, anchor: { x: 0, y: 0 }, overlay: 'SketchOnText', coordinate: 'Absolute', alignment: 'Center', fontColor: 'grey' },
              // { text: '2', font: 'Zapfino', fontSize: 12, position: { x: 10, y: 10 }, anchor: { x: 0, y: 0 }, overlay: 'SketchOnText', coordinate: 'Absolute', alignment: 'Center', fontColor: 'grey' },
            ]}
            ref={ref => (this.canvas = ref)}
            style={{flex: 1}}
            strokeColor={this.state.color}
            strokeWidth={this.state.thickness}
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

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<SampleButton />~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            <Button
              type="clear"
              icon={<Icon name="book" size={60} color="#007AFF" />}
              onPress={() => {
                console.log('Sample Overlay is opened');
                if (this.state.firstClickonSample) {

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

                  //enters only once to initialize the preset data
                  //Preset data initialization
                  function scaleYaxis(item, index) {
                    var value = (item + 2) * 200;
                    presetJSON[i].Read[index] = Math.round(value * 10) / 10;
                  }
                  for (var i = 0; i < 5; i++) {
                    presetJSON[i].Read.forEach(scaleYaxis);
                    switch (i) {
                      case 0:
                        sample_color = '#007AFF';
                        var sample1_tracePath = this.preparePathData(
                          presetJSON[i].Read,
                          i,
                          sample_color,
                        );
                        // addTrace.push(JSON.parse(sample1_tracePath));
                        addTrace.splice(0, 0, JSON.parse(sample1_tracePath));
                        this.setState({
                          tracePath: addTrace,
                        });
                        break;
                      case 1:
                        sample_color = '#FF2D55';
                        var sample2_tracePath = this.preparePathData(
                          presetJSON[i].Read,
                          i,
                          sample_color,
                        );
                        addTrace.splice(1, 0, JSON.parse(sample2_tracePath));
                        this.setState({
                          tracePath: addTrace,
                        });
                        break;
                      case 2:
                        sample_color = '#AF52DE';
                        var sample3_tracePath = this.preparePathData(
                          presetJSON[i].Read,
                          i,
                          sample_color,
                        );
                        addTrace.splice(2, 0, JSON.parse(sample3_tracePath));
                        this.setState({
                          tracePath: addTrace,
                        });
                        break;
                      case 3:
                        sample_color = '#FF9500';
                        var sample4_tracePath = this.preparePathData(
                          presetJSON[i].Read,
                          i,
                          sample_color,
                        );
                        addTrace.splice(3, 0, JSON.parse(sample4_tracePath));
                        this.setState({
                          tracePath: addTrace,
                        });
                        break;
                      case 4:
                        sample_color = '#34C759';
                        var sample5_tracePath = this.preparePathData(
                          presetJSON[i].Read,
                          i,
                          sample_color,
                        );
                        addTrace.splice(4, 0, JSON.parse(sample5_tracePath));
                        this.setState({
                          tracePath: addTrace,
                        });
                        break;
                    }
                  }
                  this.setState({
                    firstClickonSample: false,
                  });
                }
                this.setState({
                  sampleOverlay_visible: true,
                });
              }}
            />


            {/* ~~~~~~~~~~<EraseButton />~~~~~~~~~~ */}
            {/* <Button
              type="clear"
              icon={<Icon name="eraser" size={40} color="#8e8e93" />}
              onPress={() => {this.canvas.clear()}}
            /> */}

            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<AnalyzeButton />~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
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
                          var outPut1 = this.preparePathData(
                            responsefromServer[i].Read,
                            i,
                            sample_color,
                          );
                          addOutput.splice(0, 0, JSON.parse(outPut1));
                          this.setState({
                            outputPath: addOutput,
                          });
                          break;
                        case 1:
                          sample_color = '#FF2D55';
                          var outPut2 = this.preparePathData(
                            responsefromServer[i].Read,
                            i,
                            sample_color,
                          );
                          addOutput.splice(1, 0, JSON.parse(outPut2));
                          this.setState({
                            outputPath: addOutput,
                          });
                          break;
                        case 2:
                          sample_color = '#AF52DE';
                          var outPut3 = this.preparePathData(
                            responsefromServer[i].Read,
                            i,
                            sample_color,
                          );
                          addOutput.splice(2, 0, JSON.parse(outPut3));
                          this.setState({
                            outputPath: addOutput,
                          });
                          break;
                        case 3:
                          sample_color = '#FF9500';
                          var outPut4 = this.preparePathData(
                            responsefromServer[i].Read,
                            i,
                            sample_color,
                          );
                          addOutput.splice(3, 0, JSON.parse(outPut4));
                          this.setState({
                            outputPath: addOutput,
                          });
                          break;
                        case 4:
                          sample_color = '#34C759';
                          var outPut5 = this.preparePathData(
                            responsefromServer[i].Read,
                            i,
                            sample_color,
                          );
                          addOutput.splice(4, 0, JSON.parse(outPut5));
                          this.setState({
                            outputPath: addOutput,
                          });
                          break;
                      }
                    }
                  }
                 ).catch(error => {console.log(error)});
              }}
            />
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
