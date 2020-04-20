import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Overlay from './Overlay';

export class SampleButton extends Component {
  render() {
    return (
      <View>
        <Button
              type="clear"
              icon={<Icon name="book" size={60} color="#007AFF" />}
              onPress={() => {
                console.log('Sample Overlay is opened');
                if (this.state.firstClickonSample) {

                //   my_proxy.get('/config') //,{Read})
                // .then((responseSample) => {
                //     var convertJSON = responseSample.data.replace(/'/g, '"');
                //     var dataToJSON = JSON.parse(convertJSON);

                //     presetJSON.splice(0, 0, dataToJSON[0]);
                //     presetJSON.splice(1, 0, dataToJSON[1]);
                //     presetJSON.splice(2, 0, dataToJSON[2]);
                //     presetJSON.splice(3, 0, dataToJSON[3]);
                //     presetJSON.splice(4, 0, dataToJSON[4]);
                //     console.log('presetJSON' + presetJSON[0].Read);
                //   }
                //  ).catch(error => {console.log(error)});

                  //enters only once to initialize the preset data
                  //Preset data initialization
                  function scaleYaxis(item, index) {
                    var value = (item + 2) * 200;
                    presetJSON[i].Read[index] = Math.round(value * 10) / 10;
                  }
                  for (var i = 0; i < 5; i++) {
                    presetJSON[i].Read.forEach(scaleYaxis);
                    switch (i) {
                      case 0:
                        sample_color = '#007AFF';
                        var sample1_tracePath = this.preparePathData(
                          presetJSON[i].Read,
                          i,
                          sample_color,
                        );
                        // addTrace.push(JSON.parse(sample1_tracePath));
                        addTrace.splice(0, 0, JSON.parse(sample1_tracePath));
                        this.setState({
                          tracePath: addTrace,
                        });
                        break;
                      case 1:
                        sample_color = '#FF2D55';
                        var sample2_tracePath = this.preparePathData(
                          presetJSON[i].Read,
                          i,
                          sample_color,
                        );
                        addTrace.splice(1, 0, JSON.parse(sample2_tracePath));
                        this.setState({
                          tracePath: addTrace,
                        });
                        break;
                      case 2:
                        sample_color = '#AF52DE';
                        var sample3_tracePath = this.preparePathData(
                          presetJSON[i].Read,
                          i,
                          sample_color,
                        );
                        addTrace.splice(2, 0, JSON.parse(sample3_tracePath));
                        this.setState({
                          tracePath: addTrace,
                        });
                        break;
                      case 3:
                        sample_color = '#FF9500';
                        var sample4_tracePath = this.preparePathData(
                          presetJSON[i].Read,
                          i,
                          sample_color,
                        );
                        addTrace.splice(3, 0, JSON.parse(sample4_tracePath));
                        this.setState({
                          tracePath: addTrace,
                        });
                        break;
                      case 4:
                        sample_color = '#34C759';
                        var sample5_tracePath = this.preparePathData(
                          presetJSON[i].Read,
                          i,
                          sample_color,
                        );
                        addTrace.splice(4, 0, JSON.parse(sample5_tracePath));
                        this.setState({
                          tracePath: addTrace,
                        });
                        break;
                    }
                  }
                  this.setState({
                    firstClickonSample: false,
                  });
                }
                this.setState({
                  sampleOverlay_visible: true,
                });
              }}
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
