import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    StyleSheet,
  } from 'react-native';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';
  import { DrawingBoard } from '../DrawingBoard';

export default class Sample4 extends Component{
    render() {
        return (
            <View>
            <Text style={styles.Heading}>Sample 4</Text>
            <DrawingBoard></DrawingBoard>
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    Heading: {
      position: 'relative',
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontSize: 15,
      flex: 1,
      fontFamily: 'Trebuchet-BoldItalic',
      textAlign: 'center',
      color: Colors.black,
    }
  });

AppRegistry.registerComponent('Sample4', () => Sample4);
// export default Sample4;