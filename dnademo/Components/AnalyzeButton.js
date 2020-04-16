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
    var RNFS = require('react-native-fs')
    var filePath = RNFS.DocumentDirectoryPath + '/Request_File.json';
    if(RNFS.exists(filePath)){
      var fileData = RNFS.readFile(filePath, 'utf8');
    }
    var checkParse = JSON.parse(Request)
    console.log('ParseCheck:' + checkParse.id);
    console.log('Analaze button data: ' + this.state.dnapath)
    return (
      <View>
        
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
