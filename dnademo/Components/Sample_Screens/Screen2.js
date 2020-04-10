
import * as React from 'react';
import { Button, View, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { DrawingBoard } from '../DrawingBoard';
import { AnalyzeButton } from '../AnalyzeButton';


import { StyleSheet, Text } from 'react-native';

// import {
//   SafeAreaView,
  
//   ScrollView,
//   Button,
 
//   StatusBar,
// } from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


function HomeScreen({ navigation }) {
  return (
      
      <View style={{ flex: 1, justifyContent: 'flex-end',marginBottom: 43, backgroundColor: '#F5FCFF' }}>
      
      <Button color="#000000" 
        title="Analyz"
        onPress={() => navigation.navigate('JSONOuput')}
      />
     
      </View>
    );
  }

    
function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 36, backgroundColor: '#F5FCFF' }}>
      <Button color="#000000"
        title="LearnMore"
        onPress={() => Linking.openURL('https://reactnavigation.org/') }
      />

      
    </View>
  );
}



const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DNA_Demo_Example" component={HomeScreen} />
      
      <Stack.Screen name="JSONOuput" component={ProfileScreen} />
     
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
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
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  }
});