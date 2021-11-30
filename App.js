import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import Camera_mod from './src/Camera';
import { useState, useEffect } from 'react/cjs/react.development';

export default function App() {
  const [tfloaded, setloaded] = useState(false);

  useEffect(async () => await tf.ready().then(() => setloaded(true)), [])


  return (
    <View style={styles.container}>
      {tfloaded ? <Camera_mod/> : <></>}
      <StatusBar style="auto" />
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
