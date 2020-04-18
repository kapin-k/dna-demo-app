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
            <Modal
              animationType="slide"
              visible={this.state.overlayVisibility}
              onRequestClose={() => {
                console.log('Modal displaying samples have been closed!');
              }}>
              <TouchableWithoutFeedback
                onPressIn={() => this.setState({overlayVisibility: false})}>
                <View style={styles.mainModalView}>
                  <View style={styles.centeredView}>
                    {/* SAMPLE 1 */}
                    <TouchableWithoutFeedback
                      onPressIn={() =>
                        this.setState({overlayVisibility: false})
                      }>
                      <View style={styles.modalView1}>
                        <Image
                          source={require('./Sample_Screens/Sample1.png')}
                          style={{width: 370, height: 330}}
                        />
                        <View style={{marginTop: 10}}>
                          <AwesomeButtonRick
                            type="secondary"
                            height={30}
                            borderRadius={30}
                            padding={10}
                            paddingTop={5}
                            elevation={3}
                            onPress={() => {
                              this.setState({
                                overlayVisibility: false,
                                chosenSample: 1,
                              });
                            }}>
                            SAMPLE 1
                          </AwesomeButtonRick>
                        </View>
                        {/* <TouchableHighlight
                      style={{...styles.openButton}}
                      onPress={() => {
                        this.setState({
                          overlayVisibility: false,
                          chosenSample: 1,
                        });
                      }}>
                      <Text style={styles.textStyle}>SAMPLE 1</Text>
                    </TouchableHighlight> */}
                      </View>
                    </TouchableWithoutFeedback>

                    {/* SAMPLE 2 */}
                    <TouchableWithoutFeedback
                      onPressIn={() =>
                        this.setState({overlayVisibility: false})
                      }>
                      <View style={styles.modalView2}>
                        <Image
                          source={require('./Sample_Screens/Sample2.png')}
                          style={{width: 370, height: 330}}
                        />
                        <View style={{marginTop: 10}}>
                          <AwesomeButtonRick
                            type="secondary"
                            height={30}
                            borderRadius={30}
                            padding={10}
                            paddingTop={5}
                            elevation={3}
                            onPress={() => {
                              this.setState({
                                overlayVisibility: false,
                                chosenSample: 2,
                              });
                            }}>
                            SAMPLE 2
                          </AwesomeButtonRick>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>

                    {/* SAMPLE 3 */}
                    <TouchableWithoutFeedback
                      onPressIn={() =>
                        this.setState({overlayVisibility: false})
                      }>
                      <View style={styles.modalView3}>
                        <Image
                          source={require('./Sample_Screens/Sample3.png')}
                          style={{width: 370, height: 330}}
                        />
                        <View style={{marginTop: 10}}>
                          <AwesomeButtonRick
                            type="secondary"
                            height={30}
                            borderRadius={30}
                            padding={10}
                            paddingTop={5}
                            elevation={3}
                            onPress={() => {
                              this.setState({
                                overlayVisibility: false,
                                chosenSample: 3,
                              });
                            }}>
                            SAMPLE 3
                          </AwesomeButtonRick>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>

                  <View style={styles.centeredView}>
                    {/* SAMPLE 4 */}
                    <TouchableWithoutFeedback
                      onPressIn={() =>
                        this.setState({overlayVisibility: false})
                      }>
                      <View style={styles.modalView4}>
                        <Image
                          source={require('./Sample_Screens/Sample4.png')}
                          style={{width: 370, height: 330}}
                        />
                        <View style={{marginTop: 10}}>
                          <AwesomeButtonRick
                            type="secondary"
                            height={30}
                            borderRadius={30}
                            padding={10}
                            paddingTop={5}
                            elevation={3}
                            onPress={() => {
                              this.setState({
                                overlayVisibility: false,
                                chosenSample: 4,
                              });
                            }}>
                            SAMPLE 4
                          </AwesomeButtonRick>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>

                    {/* SAMPLE 5 */}
                    <TouchableWithoutFeedback
                      onPressIn={() =>
                        this.setState({overlayVisibility: false})
                      }>
                      <View style={styles.modalView5}>
                        <Image
                          source={require('./Sample_Screens/Sample5.png')}
                          style={{width: 370, height: 330}}
                        />
                        <View style={{marginTop: 10}}>
                          <AwesomeButtonRick
                            type="secondary"
                            height={30}
                            borderRadius={30}
                            padding={10}
                            paddingTop={5}
                            elevation={3}
                            onPress={() => {
                              this.setState({
                                overlayVisibility: false,
                                chosenSample: 5,
                              });
                            }}>
                            SAMPLE 5
                          </AwesomeButtonRick>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  <TouchableWithoutFeedback
                    onPress={() => this.setState({overlayVisibility: false})}>
                    <View
                      style={{
                        flex: 0.18,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 15,
                      }}>
                      <Button
                        type="clear"
                        icon={
                          <Icon
                            name="chevron-triple-down"
                            size={60}
                            color="#606063"
                          />
                        }
                        onPress={() => {
                          this.setState({
                            overlayVisibility: false,
                          });
                        }}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>;
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
