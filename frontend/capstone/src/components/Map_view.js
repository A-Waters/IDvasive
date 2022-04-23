import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Image } from "react-native";
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import image1 from '../images/Grey_Birch.jpg'
import image2 from '../images/HeartLeaf.jpg'
import image3 from '../images/Yellow_Birch.jpg'
import * as RootNavigation from './RootNavigation';
import APIclient from "../APIclient";
import ListItem from "./ListItem";

function Map_View() {

    const [data, setData] = useState([])
    
    const getDataHere = () => {
        APIclient.getData().then((res)=>{
            


            Object.values(res.data).map((report)=>{
                report['IMAGE'] = 'http://216.93.149.93:3000/image/'+report['REPORT_ID']
            })


            setData(Object.values(res.data))
            
        })
    }

    useEffect(() => {
        getDataHere()
    },[])

    return (
            data ? 
            <View style={styles.container}>
            <MapView style={styles.map}     
                initialRegion={{
                latitude: 44.4759,
                longitude: -73.2121,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}>
                {data.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={ {latitude : parseFloat(marker.LATITUDE), longitude : parseFloat(marker.LONGITUDE)} }
                        title={marker.PLANT_NAME}
                        description={marker.SUPPLIED_DESCRIPTION}
                        onCalloutPress={()=> {
                            RootNavigation.navigate('Listing', marker)
                        }}>      
                        <Callout>
                            <ListItem PLANT_NAME={marker.PLANT_NAME} 
                                LONGITUDE={marker.LONGITUDE} 
                                LATITUDE={marker.LATITUDE} 
                                SUPPLIED_DESCRIPTION={marker.SUPPLIED_DESCRIPTION} 
                                IMAGE={marker.IMAGE}
                                DISTANCE={"10"}
                                REPORT_ID={marker.REPORT_ID}
                            />
                        </Callout>
                    </Marker>
                ))}
            </MapView>
          </View>
          :
          <></>
        

    );
}

export default Map_View

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 80
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

});