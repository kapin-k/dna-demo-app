import React, { Component } from 'react';
import {
  AppRegistry,
    Text,
    StyleSheet,
    View,
  } from 'react-native';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';
  import { DrawingBoard } from '../DrawingBoard';

export default class Sample5 extends Component{
    render() {
        return (
            <View>
            <Text style={styles.Heading}>Sample 5</Text>
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

AppRegistry.registerComponent('Sample5', () => Sample5);
// export default Sample5;