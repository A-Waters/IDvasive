// https://blog.logrocket.com/create-react-native-search-bar-from-scratch/
import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import ListItem from "./ListItem";



// the filter
const List = (props) => {


    const renderItem = ({ item }) => {
        // when no input, show all
        if (props.searchPhrase === "") {
        return <ListItem PLANT_NAME={item.PLANT_NAME} 
                    LONGITUDE={item.LONGITUDE} 
                    LATITUDE={item.LATITUDE} 
                    SUPPLIED_DESCRIPTION={item.SUPPLIED_DESCRIPTION} 
                    IMAGE={item.IMAGE}
                    DISTANCE={"10"}
                    REPORT_ID={item.REPORT_ID}
                />;
        }
        // filter of the Type
        if (item.PLANT_NAME.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        return <ListItem PLANT_NAME={item.PLANT_NAME} 
                    LONGITUDE={item.LONGITUDE} 
                    LATITUDE={item.LATITUDE} 
                    SUPPLIED_DESCRIPTION={item.SUPPLIED_DESCRIPTION} 
                    IMAGE={item.IMAGE}
                    DISTANCE={"10"}
                    REPORT_ID={item.REPORT_ID}
                />;
        }
        // filter of the description
        if (item.SUPPLIED_DESCRIPTION.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        return <ListItem PLANT_NAME={item.PLANT_NAME} 
                    LONGITUDE={item.LONGITUDE} 
                    LATITUDE={item.LATITUDE} 
                    SUPPLIED_DESCRIPTION={item.SUPPLIED_DESCRIPTION} 
                    IMAGE={item.IMAGE}
                    DISTANCE={"10"}
                    REPORT_ID={item.REPORT_ID}
                />;
        }
    };

    return (
        <SafeAreaView style={styles.list__container}>
        <View
            onStartShouldSetResponder={() => {
            props.setClicked(false);
            }}
        >
            <FlatList
            data={props.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.REPORT_ID}
            />
        </View>
        </SafeAreaView>
    );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    height: "85%",
    width: "100%",
    overflow: "hidden"
  },
  item: {
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
    height: "100%",
    width: "100%",
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