import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';

export class DrawingBoard extends Component {
  render() {
    return (
        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 5, marginRight: 5 }}>
          <RNSketchCanvas
            containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
            canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
            defaultStrokeIndex={0}
            defaultStrokeWidth={7}
            // closeComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Close</Text></View>}
            undoComponent={<View style={styles.functionButton}><Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Undo</Text></View>}
            eraseComponent={<View style={styles.functionButton}><Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Eraser</Text></View>}
            clearComponent={<View style={styles.functionButton}><Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Clear</Text></View>}
            strokeComponent={color => (
              <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />
            )}
            strokeSelectedComponent={(color, index, changed) => {
              return (
                <View style={[{ backgroundColor: color, borderWidth: 5 }, styles.strokeColorButton]} />
              )
            }}
            strokeWidthComponent={(w) => {
              return (<View style={styles.strokeWidthButton}>
                <View  style={{
                  backgroundColor: 'white', marginHorizontal: 2.5,
                  width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                }} />
              </View>
            )}}
            // saveComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Save</Text></View>}
            // savePreference={() => {
            //   return {
            //     folder: 'SavedSketches',
            //     filename: String(Math.ceil(Math.random() * 100000000)),
            //     transparent: false,
            //     imageType: 'png'
            //   }
            // }}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  strokeColorButton: {
    marginHorizontal: 15, justifyContent: 'center', marginVertical: 20, width: 40, height: 40, borderRadius: 20,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 40, height: 40, borderRadius: 25,
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#8e8e93'
  },
  functionButton: {
    marginHorizontal: 2.5, marginVertical: 8, height: 40, width: 70,
    backgroundColor: '#8e8e93', justifyContent: 'center', alignItems: 'center', borderRadius: 25,
  }
});

AppRegistry.registerComponent('DrawingBoard', () => DrawingBoard);