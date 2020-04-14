import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';



export class AnalyzeButton extends Component {
  render() {
    return (
      <View>
        <Button
          type="clear"
          onPress={() => {
            alert('Server taking too long to respond!');
          }}
          // title="Checkout these samples!"
          icon={<Icon name="play-circle" size={60} color="#34C759" />}
          // icon={<Icon name="play-circle" size={70} color="#30D158" />}
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
