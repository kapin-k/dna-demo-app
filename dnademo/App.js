import React, {Component} from 'react';
import {
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

import {DrawingBoard} from './Components/DrawingBoard';
import {AnalyzeButton} from './Components/AnalyzeButton';
import {MainScreen} from './Components/MainScreen';
// import MainScreenVar from './Components/MainScreen';

import {createAppContainer} from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
//  import NavDrawer from './Components/NavigationDrawer';

import Sample1 from './Components/Sample_Screens/Sample1';
import Sample2 from './Components/Sample_Screens/Sample2';
import Sample3 from './Components/Sample_Screens/Sample3';
import Sample4 from './Components/Sample_Screens/Sample4';
import Sample5 from './Components/Sample_Screens/Sample5';
import Screen1 from './Components/Sample_Screens/Screen1';
import Screen2 from './Components/Sample_Screens/Screen2';
import Screen3 from './Components/Sample_Screens/Screen3';

const Drawer = createDrawerNavigator();
const Stack1 = createStackNavigator();
const Stack2 = createStackNavigator();
const Stack3 = createStackNavigator();

toggleDrawer = () => {
  this.props.navigationProps.toggleDrawer();
};

FirstActivity_StackNavigator = () => {
  <Stack1.Navigator>
    <Stack1.Screen name="First" component={Screen1} />
  </Stack1.Navigator>;
  // <View>
  //   <MainScreen></MainScreen>
  // </View>;
};
Screen2_StackNavigator = () => {
  <Stack2.Navigator>
    <Stack2.Screen name="Second" component={Screen2} />
  </Stack2.Navigator>;
  // <View>
  //   <MainScreen></MainScreen>
  // </View>;
};
Screen3_StackNavigator = () => {
  <Stack3.Navigator>
    <Stack3.Screen name="Thrid" component={Screen3} />
  </Stack3.Navigator>;
  // <View>
  //   <MainScreen></MainScreen>
  // </View>;
};

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
        <Image
          source={require('./Components/drawer.png')}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
      <Text style={styles.appHeading}>DNA DEMO</Text>
      <DrawingBoard />
      <AnalyzeButton />
      <NavigationContainer>
        <Drawer.Navigator>
          {/* <Drawer.Screen name="Drawing Board" children={returnMainScreen} />
          <Drawer.Screen name="Sample1" component={Sample1} />
          <Drawer.Screen name="Sample2" component={Sample2} />
          <Drawer.Screen name="Sample3" component={Sample3} />
          <Drawer.Screen name="Sample4" component={Sample4} />
          <Drawer.Screen name="Sample5" component={Sample5} /> */}
          <Drawer.Screen name = "Screen1" component = {FirstActivity_StackNavigator}/>
          <Drawer.Screen name = "Screen2" component = {Screen2_StackNavigator}/>
          <Drawer.Screen name = "Screen3" component = {Screen3_StackNavigator}/>
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
};

// const FirstActivity_StackNavigator = createStackNavigator({
//   //All the screen from the Screen1 will be indexed here
//   First: {
//     screen: Screen1,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Smarten',
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: '#000000',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });

// const Screen2_StackNavigator = createStackNavigator({
//   //All the screen from the Screen2 will be indexed here
//   Second: {
//     screen: Screen2,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Example',
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: '#000000',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });

// const Screen3_StackNavigator = createStackNavigator({
//   //All the screen from the Screen3 will be indexed here
//   Third: {
//     screen: Screen3,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Example 2',
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: '#000000',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });

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

export default createAppContainer(Drawer);
// export default App;
