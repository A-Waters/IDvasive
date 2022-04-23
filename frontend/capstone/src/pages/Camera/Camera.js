import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Camera_mod from '../../components/Camera';

function Camera({ navigation }) {


    return (
        <View style={styles.container}>
          <Camera_mod></Camera_mod>
        </View>
    )
}


export default Camera;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0f0',
      /*alignItems: 'center',
      justifyContent: 'center',*/
      height: 360,
      width: 360,
      margin: "auto",
      overflow: "hidden"
    },
  });