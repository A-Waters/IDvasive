import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { useState, useEffect } from 'react/cjs/react.development';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// custom components 
import BotNavBar from './components/BotNavBar'
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './components/RootNavigation';

// pages
import Home from './pages/Home/Home';
import Camera from './pages/Camera/Camera';
import Search from './pages/Search/Search';
import TopBar from './components/TopBar';
import Listing from './components/Listing';

const Stack = createNativeStackNavigator();

export default function App() {
  const [tfloaded, setloaded] = useState(false);

  useEffect(async () => await tf.ready().then(() => setloaded(true)), [])

  return (
    <View style={styles.container}>
      <TopBar></TopBar>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Camera"
            component={Camera}
            options={{ headerShown: false }}
          />
            <Stack.Screen
            name="Search"
            component={Search}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Listing"
            component={Listing}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      <BotNavBar>{tfloaded}</BotNavBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    /*alignItems: 'center',
    justifyContent: 'center',*/
  },
});
