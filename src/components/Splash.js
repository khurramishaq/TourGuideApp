import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import {PRIMARY_COLOR,SECONDARY_COLOR} from '../utils/colors'
function Loading({navigation}) {


  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: user == null ? 'Login' : 'Home'}],
          }),
        );
      }, 2000);
    });
  });

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logoIcon} source={require('../assets/logo.png')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
  },

  text: {
    color: SECONDARY_COLOR,
    fontSize: 20,
    margin: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  logoIcon: {
    width: 250,
    height: 250,
  },
});

export default Loading;
