import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Modal,
} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AnalyzeButton} from './AnalyzeButton';
import {SampleButton} from './SampleButton';

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';

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
      thickness: 8,
      message: '',
      photoPath: null,
      chosenSample: null,
      scrollEnabled: true,
      path: null,
      overlayVisibility: false,
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

  render() {
    var RNFS = require('react-native-fs');
    var _ = require('lodash');
    // RNFS.downloadFile({
    //   fromUrl:
    //     'https://github.com/kapin-k/dna-demo-app/blob/master/dnademo/ios/background.PNG',
    //   toFile: `${RNFS.DocumentDirectoryPath}/background-board.png`,
    // }).promise.then(r => {
    // console.log('BACKGROUND SET');
    // });
    // var backgroundPath = RNFS.DocumentDirectoryPath + '/background-board.png'
    // console.log('Checking state.path ' + this.state.path)
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Modal
          animationType="slide"
          visible={this.state.overlayVisibility}
          onRequestClose={() => {
            console.log('Modal displaying samples have been closed!');
          }}>
          <TouchableWithoutFeedback
            onPressIn={() => this.setState({overlayVisibility: false})}>
            <View style={styles.mainModalView}>
              <View style={styles.centeredView}>
                {/* SAMPLE 1 */}
                <TouchableWithoutFeedback
                  onPressIn={() => this.setState({overlayVisibility: false})}>
                  <View style={styles.modalView1}>
                    <Image
                      source={require('./Sample_Screens/Sample1.png')}
                      style={{width: 370, height: 330}}
                    />
                    <TouchableHighlight
                      style={{...styles.openButton}}
                      onPress={() => {
                        this.setState({
                          overlayVisibility: false,
                          chosenSample: 1,
                        });
                      }}>
                      <Text style={styles.textStyle}>SAMPLE 1</Text>
                    </TouchableHighlight>
                  </View>
                </TouchableWithoutFeedback>

                {/* SAMPLE 2 */}
                <TouchableWithoutFeedback
                  onPressIn={() => this.setState({overlayVisibility: false})}>
                  <View style={styles.modalView2}>
                    <Image
                      source={require('./Sample_Screens/Sample2.png')}
                      style={{width: 370, height: 330}}
                    />
                    <TouchableHighlight
                      style={{...styles.openButton}}
                      onPress={() => {
                        this.setState({
                          overlayVisibility: false,
                          chosenSample: 2,
                        });
                      }}>
                      <Text style={styles.textStyle}>SAMPLE 2</Text>
                    </TouchableHighlight>
                  </View>
                </TouchableWithoutFeedback>

                {/* SAMPLE 3 */}
                <TouchableWithoutFeedback
                  onPressIn={() => this.setState({overlayVisibility: false})}>
                  <View style={styles.modalView3}>
                    <Image
                      source={require('./Sample_Screens/Sample3.png')}
                      style={{width: 370, height: 330}}
                    />
                    <TouchableHighlight
                      style={{...styles.openButton}}
                      onPress={() => {
                        this.setState({
                          overlayVisibility: false,
                          chosenSample: 3,
                        });
                      }}>
                      <Text style={styles.textStyle}>SAMPLE 3</Text>
                    </TouchableHighlight>
                  </View>
                </TouchableWithoutFeedback>
              </View>

              <View style={styles.centeredView}>
                {/* SAMPLE 4 */}
                <TouchableWithoutFeedback
                  onPressIn={() => this.setState({overlayVisibility: false})}>
                  <View style={styles.modalView4}>
                    <Image
                      source={require('./Sample_Screens/Sample4.png')}
                      style={{width: 370, height: 330}}
                    />
                    <TouchableHighlight
                      style={{...styles.openButton}}
                      onPress={() => {
                        this.setState({
                          overlayVisibility: false,
                          chosenSample: 4,
                        });
                      }}>
                      <Text style={styles.textStyle}>SAMPLE 4</Text>
                    </TouchableHighlight>
                  </View>
                </TouchableWithoutFeedback>

                {/* SAMPLE 5 */}
                <TouchableWithoutFeedback
                  onPressIn={() => this.setState({overlayVisibility: false})}>
                  <View style={styles.modalView5}>
                    <Image
                      source={require('./Sample_Screens/Sample5.png')}
                      style={{width: 370, height: 330}}
                    />
                    <TouchableHighlight
                      style={{...styles.openButton}}
                      onPress={() => {
                        this.setState({
                          overlayVisibility: false,
                          chosenSample: 5,
                        });
                      }}>
                      <Text style={styles.textStyle}>SAMPLE 5</Text>
                    </TouchableHighlight>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <TouchableWithoutFeedback
                onPress={() => this.setState({overlayVisibility: false})}>
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
                      this.setState({
                        overlayVisibility: false,
                      });
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <View style={{flex: 1, flexDirection: 'column'}}>
          {/* Place eraser component */}
          <SketchCanvas
            localSourceImage={{
              filename: 'background.png',
              directory:
                '/Users/invenstphonethree/Documents/dna-demo-app/dnademo/background.png',
              mode: 'ScaleToFill',
            }}
            text={[
              {
                text: '<----------- Time (milliseconds) ----------->',
                font: 'Zapfino',
                fontSize: 15,
                position: {x: 441, y: 880},
                anchor: {x: 0, y: 0},
                overlay: 'SketchOnText',
                coordinate: 'Absolute',
                alignment: 'Center',
                fontColor: 'grey',
              },
              {
                text: '2000',
                font: 'Zapfino',
                fontSize: 12,
                position: {x: 1300, y: 888},
                anchor: {x: 0, y: 0},
                overlay: 'SketchOnText',
                coordinate: 'Absolute',
                alignment: 'Center',
                fontColor: 'grey',
              },
              {
                text: '0',
                font: 'Zapfino',
                fontSize: 12,
                position: {x: 10, y: 888},
                anchor: {x: 0, y: 0},
                overlay: 'SketchOnText',
                coordinate: 'Absolute',
                alignment: 'Center',
                fontColor: 'grey',
              },
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
            {/* ~~~~~~~~~~~~~~~<SampleButton />~~~~~~~~~~~~~~~ */}
            <Button
              type="clear"
              icon={<Icon name="book" size={60} color="#007AFF" />}
              onPress={() => {
                this.setState({
                  overlayVisibility: true,
                });
              }}
            />

            {/* ~~~~~~~~~~~~~~~<AnalyzeButton />~~~~~~~~~~~~~~~ */}
            <Button
              type="clear"
              icon={<Icon name="play-circle" size={60} color="#34C759" />}
              onPress={() => {
                var filePath = RNFS.DocumentDirectoryPath + '/Response.json';
                var split2 = '';
                var userInput = JSON.stringify(this.canvas.getPaths());
                if (userInput == '[]') {
                  Alert.alert(
                    'Oops, empty drawing board!',
                    'If you dont know where to start, please checkout the sample traces by clicking the blue icon. Happy tracing!!!',
                    [{text: 'Okay', onPress: () => console.log('OK Pressed')}],
                    {cancelable: false},
                  );
                }
                console.log('userInput : ' + userInput);
                var split1 = userInput.split('data":');
                // console.log('split1 : ' + split1);
                // console.log('length of split1: ' + split1.length);
                for (var i = 1; i < split1.length; i++) {
                  var temp_split = split1[i].split('},"s');
                  split2 = split2.concat(temp_split[0]);
                  split2 = split2.replace(/",/g, '],');
                  split2 = split2.replace(/"/g, '[');
                  split2 = split2.replace('[]', ']]');
                  split2 = split2.replace('][', '],[');
                }
                // console.log('split2 : ' + split2);
                var readSplit = '"Read":' + split2;
                var dataToServer = "'{".concat(readSplit).concat("}'");
                console.log('dataToServer : ' + dataToServer);

                // Just for testing (Change per user)
                // RNFS.writeFile('/Users/invenstphonethree/Documents/dna-demo-app/dnademo/Components/Request.json',userInput,'utf8',);

                //Incase we need to write a json file for the output recieved from the Server
                RNFS.writeFile(filePath, userInput, 'utf8')
                  .then(success => {
                    console.log('FILE WRITTEN!');
                  })
                  .catch(err => {
                    console.log(err.message);
                  });

                this.setState(
                  {
                    path: userInput,
                  },
                  () => {},
                );
                this.canvas.clear();
                {
                  /* ~~~~~~~~~~~~~~~<Backend Calls />~~~~~~~~~~~~~~~ */
                }
                //ADD BACKEND CODE HERE
              }}
            />

            {/* <TouchableOpacity
              style={[
                styles.functionButton,
                {backgroundColor: 'black', width: 90},
              ]}
              onPress={() => {
                console.log(JSON.stringify(this.canvas.getPaths()));
              }}>
              <Text style={{color: 'white'}}>Get Paths</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    );
  }
}

// getOutput = canvas => {
//   this.state.path = JSON.stringify(this.canvas.getPaths());
// };

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
    justifyContent: 'space-around',
    // alignItems: 'center',
    marginTop: 25,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 15,
    // backgroundColor: 'green',
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
    marginBottom: 15,
    // backgroundColor: 'green',
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
