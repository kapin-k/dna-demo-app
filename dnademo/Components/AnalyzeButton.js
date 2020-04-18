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
