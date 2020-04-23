import React, {Component} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {DrawingBoard} from './Components/DrawingBoard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dnaPath: 'app.js',
    };
  }

  onPathChange(newname) {
    this.setState({dnaPath: newname});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appHeading}>DNA DEMO</Text>
        <DrawingBoard></DrawingBoard>
      </View>
    );
  }
}

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
  },
});

export default App;
