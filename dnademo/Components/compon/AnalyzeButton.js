import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
  } from 'react-native';

export class AnalyzeButton extends Component{
    render() {
        return (
            <View style={ styles.analyzeButton } >

            <Text style={styles.textFill}>Analyze</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    analyzeButton: {
      marginBottom: 15, marginRight: 8, height: 60, width: 200, alignSelf: 'center', backgroundColor: '#ccffdd', justifyContent: 'center', alignItems: 'center', borderRadius: 45,
    },
    textFill: {
        color: 'black', fontWeight: 'bold', fontSize: 15
    },
  });

  AppRegistry.registerComponent('AnalyzeButton', () => AnalyzeButton);