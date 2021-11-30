import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import { Camera } from 'expo-camera';



function camera_mod()
{

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type}>
            <View style={styles.buttonContainer}>
                
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                    }}>
                    <Text style={styles.text}> Flip </Text>
                </TouchableOpacity>
            </View>
        </Camera>
      </View>
    )
}


export default camera_mod



const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20,
    },
    button: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
  });