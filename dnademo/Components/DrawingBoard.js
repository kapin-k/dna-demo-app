import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';

import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

export default class DrawingBoard extends Component {
  render() {
    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <SketchCanvas
            style={{ flex: 1 }}
            strokeColor={'red'}
            strokeWidth={7}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
});

AppRegistry.registerComponent('DrawingBroad', () => DrawingBoard);
