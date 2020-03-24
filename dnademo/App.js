import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
 import DrawingBoard from './Components/DrawingBoard';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
    <Text style={styles.appHeading}>
    DNA DEMO
    </Text>
    <DrawingBoard></DrawingBoard>
    </View>
  );
};

const styles = StyleSheet.create({
  appHeading: {
    position: 'relative',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: Colors.black,
  },
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF',
  },
});

export default App;
