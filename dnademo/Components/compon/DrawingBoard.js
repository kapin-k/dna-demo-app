import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native';

import {AnalyzeButton} from './AnalyzeButton';


import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';


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
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <SketchCanvas
            localSourceImage={{
              filename: 'background.jpg',
              directory: '',
              mode: 'ScaleToFill',
            }}
            
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
