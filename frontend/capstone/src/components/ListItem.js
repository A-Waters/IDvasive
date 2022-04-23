

import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as RootNavigation from './RootNavigation';
import { WebView } from 'react-native-webview';

function ListItem (props) {

    return (
        <TouchableOpacity onPress={() => (RootNavigation.navigate('Listing', props))}>
            <View style={styles.item} >
              {console.log(props)}
                <View style={{flex: 1}}>
                  <WebView style={styles.image} source={{ uri: props.IMAGE }}></WebView>
                </View>
                <View style={[styles.VertFlex, {flex: 2}]}>
                    <View style={styles.VerItem}>
                        <Text style={styles.Location}>{props.LONGITUDE + "° N " + props.LATITUDE + "° W"}</Text>
                    </View>
                    <View style={styles.VerItem}>
                        <Text style={styles.Distance}>{props.DISTANCE + " Miles Away"}</Text>
                    </View>
                    <View style={styles.VerItem}>
                        <Text style={styles.Type}>{props.PLANT_NAME}</Text>
                    </View>
                    <View style={styles.VerItem}> 
                        <Text style={styles.Description}>{
                            (props.SUPPLIED_DESCRIPTION.length > 140) ? (props.SUPPLIED_DESCRIPTION.substr(0,140) + "...") : (props.SUPPLIED_DESCRIPTION)}
                        </Text>
                    </View>
                    
                </View>
            </View>
        </TouchableOpacity>
    )


}
export default ListItem;



const styles = StyleSheet.create({
    list__container: {
      height: "85%",
      width: "100%",
    },
    item: {
        minHeight: 150,
        elevation: 10,
        zIndex: -1,
        borderRadius: 20,
        margin: 10,
        flexDirection: "row",
        maxHeight: 150,
        backgroundColor: 'white'
    },
    Type: {
      padding: 0,
      margin: 0,
      fontSize: 30,
      marginBottom: 5,
      fontStyle: "italic",
    },
    image: {
      height: 100,
      width: 100,
      borderRadius: 20,
    },
    Location: {
      color: "#999",
      padding: 0,
      margin: 0,
    },
    VertFlex: {
      flexDirection: "column",
      paddingLeft: 10
    },
    VerItem:  {
      flex: 1,
      margin: 0,
      padding: 0,
    },
    Distance: {
      color: "#999",
      padding: 0,
      margin: 0,
    },
    Description:{
      color: "#999",
      padding: 0,
      margin: 0,
    }
  });