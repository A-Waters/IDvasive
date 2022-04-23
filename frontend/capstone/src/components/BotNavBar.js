import { StyleSheet, Text, View , Dimensions, Pressable} from 'react-native';
import React from 'react';
import * as RootNavigation from './RootNavigation';


function BotNavBar( props )
{
    return (
        <View style={[styles.box, {flexDirection: "row", justifyContent: "space-evenly"}]}>
            <View style={{ flex: 1} }> 
                <Pressable style={styles.button}  onPress={() => {RootNavigation.navigate('Home')}}>
                    <Text style={styles.text}>Home</Text>
                </Pressable>
            </View>
            <View style={{ flex: 1}} > 
                <Pressable style={styles.button} onPress={() => { props ? RootNavigation.navigate('Camera') : 0}}>
                    <Text style={styles.text}>Camera</Text>
                </Pressable>
            </View>
            <View style={{ flex: 1}}> 
                <Pressable style={styles.button} onPress={() => {RootNavigation.navigate('Search')}}>
                    <Text style={styles.text}>Search</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default BotNavBar

const styles = StyleSheet.create({
    box: {
        flex: 1,
        width: "100%",
        height: 70,
        backgroundColor: "#fff",
        position: 'absolute',
        top: Dimensions.get('window').height - 70,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        backgroundColor: 'transparent',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
      },
    
})