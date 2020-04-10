import React, {Component} from 'react';
import {
  AppRegistry,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {DrawingBoard} from './DrawingBoard';
import {AnalyzeButton} from './AnalyzeButton';

//  import { NavigationContainer, DrawerRouter } from '@react-navigation/native';
//  import { createDrawerNavigator } from '@react-navigation/drawer';
//  import NavDrawer from './Components/NavigationDrawer';

// import Sample1 from './Components/Sample_Screens/Sample1';
// import Sample2 from './Components/Sample_Screens/Sample2';
// import Sample3 from './Components/Sample_Screens/Sample3';
// import Sample4 from './Components/Sample_Screens/Sample4';
// import Sample5 from './Components/Sample_Screens/Sample5';

export class MainScreen extends Component {
  //   const Drawer = createDrawerNavigator();
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appHeading}>DNA DEMO</Text>
        <DrawingBoard />
        <AnalyzeButton />
        {/* <NavigationContainer>
      <Drawer.Navigator>
      <Drawer.Screen name="Sample1" children/>
      <Drawer.Screen name="Sample2" component={Sample2}/>
      <Drawer.Screen name="Sample3"/>
      <Drawer.Screen name="Sample4"/>
      <Drawer.Screen name="Sample5"/>
      </Drawer.Navigator>
    </NavigationContainer> */}
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
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('MainScreen', () => MainScreen);
