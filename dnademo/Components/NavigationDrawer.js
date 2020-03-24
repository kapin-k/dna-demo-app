import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
  } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import App from '../App';

const NavDrawer = createDrawerNavigator ();

export default function NavigationDrawer() {
    return (
      <NavigationContainer independent="true">
        <NavDrawer.Navigator initialRouteName="Home">
          <NavDrawer.Screen name="Home" component={App} />
        </NavDrawer.Navigator>
      </NavigationContainer>
    );
  }

const styles = StyleSheet.create({
    analyzeButton: {
      marginBottom: 15, marginRight: 8, height: 60, width: 200, alignSelf: 'center', backgroundColor: '#ccffdd', justifyContent: 'center', alignItems: 'center', borderRadius: 45,
    },
    textFill: {
        color: 'black', fontWeight: 'bold', fontSize: 15
    },
  });

  AppRegistry.registerComponent('NavigationDrawer', () => NavigationDrawer);