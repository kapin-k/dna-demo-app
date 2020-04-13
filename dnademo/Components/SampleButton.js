import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Alert} from 'react-native';
import {Button} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';

export class SampleButton extends Component {
  render() {
    return (
      <View>
        {/* <Icon
  name='rowing' /> */}
        {/* <Text style={styles.textFill}>SampleButton</Text> */}
        {/* <Icon name="sc-telegram" color="#517fa4" /> */}
        <Button
          onPress={() => {
            alert('You tapped the button!');
          }}
          title="Press Me"
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
    alignSelf: 'flex-start',
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

AppRegistry.registerComponent('SampleButton', () => SampleButton);
