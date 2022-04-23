import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import { Camera } from 'expo-camera';
import { cameraWithTensors, decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs';




function Camera_mod()
{
    const TensorCamera = cameraWithTensors(Camera);
    const [type, setType] = useState(Camera.Constants.Type.back);
 

    const create_model = () => 
    {
        console.log("TASDA: ", "created")
        const model = tf.sequential();
        model.add(tf.layers.dense({units: 40, inputShape: [360,360,3]}));
        model.add(tf.layers.dense({units: 7}));
        model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

        return model
    }
        

    const [model, setModel] = useState(create_model())

    const test_image = (imagetensor) => 
    {
        let insert = imagetensor.expandDims(0)

        let prediction = model.predict(insert)

        return prediction
    }


    const handleCameraStream = (images, updatePreview, gl) => 
    {
      try {
        const loop = async () => 
        {
          const nextImageTensor = images.next().value
          
          let result = test_image(nextImageTensor)
          
          console.log("RESULT", result.arraySync()[0][0][0])
          
          // if autorender is false you need the following two lines.
          // updatePreview();
          // gl.endFrameEXP();
    
          requestAnimationFrame(loop);
        }
        loop(); 
      } catch (error) {
        console.log(error)
      }
    }

    let textureDims;
    if (Platform.OS === 'ios') {
        textureDims = {
        height: 360,
        width: 360,
        };
    } else {
        textureDims = {
        height: 360,
        width: 360,
        };
    }

    return (
      <TensorCamera
          // Standard Camera props
          style={styles.camera}
          type={Camera.Constants.Type.front}
          // Tensor related props
          cameraTextureHeight={textureDims.height}
          cameraTextureWidth={textureDims.width}
          resizeHeight={360}
          resizeWidth={360}
          resizeDepth={3}
          onReady={handleCameraStream}
          autorender={true}
      />
    )
}


export default Camera_mod



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