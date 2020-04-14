import React, {Component} from 'react';
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

import {DrawingBoard} from './Components/DrawingBoard';
import {AnalyzeButton} from './Components/AnalyzeButton';
import {SampleButton} from './Components/SampleButton';

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.appHeading}>DNA DEMO</Text>
      <DrawingBoard></DrawingBoard>
      <View
        style={{
          justifyContent: 'space-between',
          width: 1000,
          flexDirection: 'row',
        }}>
        <SampleButton />
        <AnalyzeButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appHeading: {
    position: 'relative',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 15,
    fontFamily: 'Trebuchet-BoldItalic',
    textAlign: 'center',
    color: Colors.black,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;
