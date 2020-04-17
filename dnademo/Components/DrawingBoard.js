import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AnalyzeButton} from './AnalyzeButton';

import Request from './Request.json';

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import {SampleButton} from './SampleButton';

export class DrawingBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#1C1C1E',
      thickness: 8,
      message: '',
      photoPath: null,
      scrollEnabled: true,
      path: null,
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
    // console.log('Checking state.path ' + this.state.path)
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          {/* Place eraser component */}
          <SketchCanvas
            localSourceImage={{
              filename: 'background.jpg',
              directory: '',
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
              console.log('pathsCount', pathsCount);
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            {/* <Button
              type="clear"
              icon={<Icon name="book" size={60} color="#007AFF" />}
              onPress={() => {
                console.log('This is the output' + JSON.stringify(this.canvas.getPaths()));
                this.setState({path: JSON.stringify(this.canvas.getPaths())});
                //  <Overlay></Overlay>
              }}
            /> */}
            <SampleButton />

            <Button
              type="clear"
              icon={<Icon name="play-circle" size={60} color="#34C759" />}
              onPress={() => {
                var RNFS = require('react-native-fs');
                var _ = require('lodash');
                var filePath =
                  RNFS.DocumentDirectoryPath + '/Response.json';
                var split2 = '';
                var userInput = JSON.stringify(this.canvas.getPaths());
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
                  () => {
                  },
                );

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
});

AppRegistry.registerComponent('DrawingBoard', () => DrawingBoard);
