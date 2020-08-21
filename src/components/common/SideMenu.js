import React, {useState, useEffect} from 'react';
import { View, SafeAreaView, Image, Text, ScrollView, StyleSheet } from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ASSET_COLOR, SECONDARY_COLOR } from '../../utils/colors';
function SideMenu(props) {

  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');

  var user = auth().currentUser;
  const ref = firestore().collection('users');

  async function getData() {
    if (user != null) {
      setPhoto(user.photoURL);
    }
    await ref
      .doc(user.email)
      .get()
      .then((doc) => {
        if (doc.exists) {
          var data = doc.data();
          setName(data.name);
        }
      })
      .catch((err) => {
        console.log('Error getting document', err);
      });
  }

  useEffect(() => {
    getData();
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: 160,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: SECONDARY_COLOR,
          marginBottom: 10,
        }}>

        {photo === null ? (
          <Image
            style={styles.avatar}
            source={require('../../assets/profile.png')}
          />
        ) : (
            <Image style={styles.avatar} source={{ uri: photo }} />
          )}

        <Text style={{ color: ASSET_COLOR, marginTop: 5, fontSize: 20, fontWeight: "bold" }}>
          {name}
        </Text>
      </View>
      <ScrollView>
        <DrawerItemList {...props} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: ASSET_COLOR,
    borderWidth: 2
  }
});

export default SideMenu;
