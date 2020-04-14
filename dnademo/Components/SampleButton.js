import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Overlay from 'react-native-modal-overlay';

export class SampleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
    };
  }

  onClose = () => this.setState({modalVisible: false});

  changeState = () => {
    if (this.state.overlayVisible) {
      console.log("I'm here");
      this.setState(state => ({
        overlayVisible: false,
      }));
    } else {
      // this.setState({overlayVisible: true});
      this.setState(state => ({
        overlayVisible: true,
      }));
    }
  };

  render() {
    return (
      <View>
        <Button
          type="clear"
          icon={<Icon name="book" size={60} color="#007AFF" />}
          onPress={() => {
            <Overlay
              visible={this.state.modalVisible}
              onClose={this.onClose}
              closeOnTouchOutside>
              <Text>Some Modal Content</Text>
            </Overlay>
          }}
          //   title={<Text style = {styles.buttonText} > Checkout these samples!</Text>}
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
