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
// import App from '../../App';

export default class Sample1 extends Component{
    render() {
        return (
            <View>
            <Text style={styles.Heading}>Sample 1</Text>
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

// export default Sample1;
AppRegistry.registerComponent('Sample1', () => Sample1);