/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {FlatList, NativeBaseProvider} from 'native-base';
import React, {useState, useEffect} from 'react';
import {Pressable, SafeAreaView, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {CustomText} from './CustomText';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    name();
  }, []);

  const name = params => {
    const options = {
      method: 'GET',
      headers: {Accept: 'application/json'},
    };

    fetch('url', options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.data.length) {
          setData(response.data);
          response.data.filter(obj => obj.status !== 1);
        }
      })
      .catch(e => console.log(e));
  };

  const renderItem = ({item}) => (
    <Pressable
      onPress={() => {
        console.log(item);
      }}
      style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 5,
      }}>
      <View style={{flex: 0.5}}>
        <CustomText>{item.name}</CustomText>
      </View>
      <View style={{flex: 0.5, alignItems: 'flex-end'}}>
        <CustomText>{item.status_name}</CustomText>
      </View>
    </Pressable>
  );

  return (
    <NativeBaseProvider
      style={{
        backgroundColor: Colors.lighter,
        flex: 1,
      }}>
      <SafeAreaView
        style={{
          backgroundColor: Colors.lighter,
          flex: 1,
        }}>
        <View style={{margin: 2, flex: 0.5}}>
          <View style={{flex: 1}}>
            <CustomText>All systems are operational</CustomText>
          </View>
          <View style={{flex: 2}}>
            <CustomText>Other Components</CustomText>
            <FlatList
              ListEmptyComponent={() => (
                <View>
                  <CustomText>No data found</CustomText>
                </View>
              )}
              data={data}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
            />
          </View>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default App;
