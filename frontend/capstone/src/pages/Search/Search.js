import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, } from 'react-native';
import Searchbar from '../../components/searchbar'
import List from '../../components/list'
import APIclient from "../../APIclient";

function Search({ navigation }) {


  // https://blog.logrocket.com/create-react-native-search-bar-from-scratch/
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState();


  useEffect(() => {
    const getData = () => {

      
      APIclient.getData().then((res)=>{
            
        Object.values(res.data).map((report)=>{
            report['IMAGE'] = 'http://216.93.149.93:3000/image/'+report['REPORT_ID']
        })


        setData(Object.values(res.data))
      
      })
    }
    getData();
  }, []);

    return (
        <View style={styles.container}>
          {!clicked}
          <Searchbar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />
          {!data ? (
        <></>
        ) : (
        
          <List
            searchPhrase={searchPhrase}
            data={data}
            setClicked={setClicked}
          />
        
        )}

          
        </View>
    )
}


export default Search;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      /*alignItems: 'center',
      justifyContent: 'center',*/
    },
  });