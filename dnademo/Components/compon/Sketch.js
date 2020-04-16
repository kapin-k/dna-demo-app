import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import {Button} from 'react-native';

import {LineChart } from "react-native-chart-kit";


import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';


export class Sketch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      color: '#1C1C1E',
      thickness: 8,
      message: '',
      photoPath: null,
      scrollEnabled: true,
      path: null,
    };
  }
  updateState = () => {
    console.log('updateState called');
   this.setState(previousState => {
      return {
        path: JSON.stringify(this.canvas.getPaths()),
      };
    });
  };

  render() {

   return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          {/* Place eraser component */}
          <SketchCanvas
            localSourceImage={{
              filename: 'background.jpg',
              directory: '',
              mode: 'ScaleToFill',
            }}
            
            ref={ref => (this.canvas = ref)}
            style={{flex: 1, zIndex:10}}
            strokeColor={this.state.color}
            strokeWidth={this.state.thickness}
            onStrokeStart={(x, y) => {
              console.log('x: ', x, ', y: ', y);
              this.setState({message: 'Start'});
            }}
            onStrokeChanged={(x, y) => {
              console.log('x: ', x, ', y: ', y);
              this.setState({message: 'Changed'});
            }}
            onStrokeEnd={() => {
              this.setState({message: 'End'});
                }}
            onPathsChange={pathsCount => {
              console.log('pathsCount', pathsCount);
            }}
          />


 
       <View style={{marginTop: -480 }}>
         <Text style={{
                textAlign: 'center',
                fontSize: 18,
                padding: 16,
                marginTop: -480,
                zIndex:1
              }}>Disease_Name_ :</Text>
  
  <LineChart data={{ labels: ["0.2s", "0.4s", "0.6s", "0.8s", "1s"], 
  datasets: [
        {
          data: [2, 3]
        }
      ]
    }}

width={Dimensions.get("window").width} // from react-native
    height={320}
    yAxisLabel=""
    xAxisSuffix="s"
withInnerLines={false}
withOuterLines={false}
    yAxisInterval={1} // optional, defaults to 1
    xAxisInterval={1}
    chartConfig={{
      
      fromZero: false,
      backgroundColor: "#0000ff",
      backgroundGradientFrom: "#0000ff",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 0
      },
      tooltip: {
    visible: true,
    labelFontSize: 0
  },
      propsForDots: {
        r: "",
        strokeWidth: "14",
        stroke: "#000000"
      }
    }}
    
    style={{
      marginVertical: 0,
      borderRadius: 0
    }}


    />
</View>

    
   
  
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            
           

            

            
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  strokeColorButton: {
    marginHorizontal: 15,
    justifyContent: 'center',
    marginVertical: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8e8e93',
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 50,
    width: 50,
    // backgroundColor: '#f05454',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 25,
  },
});

AppRegistry.registerComponent('DrawingBoard', () => DrawingBoard);
