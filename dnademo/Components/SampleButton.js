import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export class SampleButton extends Component {
  render() {
    return (
      <View>
        <Button
        type = "clear"
          onPress={() => {
            alert('You tapped the button!');
          }}
        //   title={<Text style = {styles.buttonText} > Checkout these samples!</Text>}
          icon={<Icon name="book" size={60} color="#007AFF" />}
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
  buttonText: {
      color: 'blue',
      fontSize: 15,
      fontWeight: 'bold',
  },
});

AppRegistry.registerComponent('SampleButton', () => SampleButton);
