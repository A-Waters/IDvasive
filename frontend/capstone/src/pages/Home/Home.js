import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map_View from '../../components/Map_view'

function Home({ navigation }) {


    return (
        <View style={styles.container}>
            <Map_View/>
        </View>
    )
}


export default Home;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: '#fff',
        /*alignItems: 'center',
        justifyContent: 'center',*/
    },
  });