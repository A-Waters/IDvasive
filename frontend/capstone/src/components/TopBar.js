import { StyleSheet, Text, View , Dimensions, Pressable} from 'react-native';
import React from 'react';
import * as RootNavigation from './RootNavigation';
import { color } from 'react-native-reanimated';



function TopBar()
{

    return (
        <View style={styles.root}>
            <View style={styles.logoBox}>
                <Text style={styles.logo}>IDvasive</Text>
            </View>

            <View style={styles.profileBox}>
                <Text style={styles.profile}>Profile</Text>
            </View>
        </View>
    )
}


export default TopBar;


const styles = StyleSheet.create({
    root: {
        paddingTop: 20,
        height: 50,
        color: "#fff",
        flexDirection: "row",
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        justifyContent: "space-evenly"
    },
    logo:{
        fontSize: 25,
        paddingLeft: 30
    },
    logoBox:{
        flex: 4,
    },
    profile:{
        marginRight: 30
    },
    profileBox:{
        flex: 1,
    }
})