import React from "react";
import { Image, Text, View } from "react-native";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import WebView from "react-native-webview";

function Listing(props) {

    return(
        <View style={styles.container}>
            <WebView style={styles.IMAGE} source={ {uri: props.route.params.IMAGE} }/>
            
            <View style={styles.content}>
                <Text>{props.route.params.PLANT_NAME}</Text>
                <Text>{props.route.params.MILES}</Text>
                <Text>{props.route.params.LONGITUDE + " " + props.route.params.LATITUDE}</Text>
                <Text>{props.route.params.SUPPLIED_DESCRIPTION}</Text>
            </View>
        </View>
        
    )
}

export default Listing;

const styles = StyleSheet.create({

    container: {
        flexDirection: "column",
        backgroundColor: "#fff",
        height: "100%"
    },
    Image: {
        width: "100%",
        flex: 2
    },
    content: {
        flex: 4
    }

})