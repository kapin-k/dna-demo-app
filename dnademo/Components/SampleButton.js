import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, Button, View, Alert} from 'react-native';

export class SampleButton extends Component {
  render() {
    return (
      <View style={styles.analyzeButton}>
        {/* <Text style={styles.textFill}>SampleButton</Text> */}
        <Button
        //   icon={<Icon name="arrow-right" size={15} color="white" />}
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
