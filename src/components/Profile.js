import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Linking
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Share from 'react-native-share';
import DialogInput from 'react-native-dialog-input';
import ImagePicker from 'react-native-image-picker';
import Loading from './common/Loading';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../utils/colors';

const url = 'https://www.tourplan.com/';
const title = 'Share Link';
const message = 'Please check this out.';
const options = {
  title,
  subject: title,
  message: `${message} ${url}`,
};

const options1 = {
  title: 'Select Photo',
  takePhotoButtonTitle: 'Take Photo',
  chooseFromLibraryButtonTitle: 'Choose Photo from Gallery',
};

function Profile({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const [loading, setLoading] = useState(false);
  const [phoneEdit, setPhoneEdit] = useState(false);
  const [nameEdit, setNameEdit] = useState(false);

  const [isDialogVisible, setDialogVisible] = useState(false);

  const showDialog = () => {
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  var user = auth().currentUser;
  const ref = firestore().collection('users');

  async function resetPassword(inputText) {
    var newPassword = inputText;

    user
      .updatePassword(newPassword)
      .then(function () {
        Alert.alert('Success', 'Your password has been changed successfully.');
        hideDialog();
      })
      .catch(function (error) {
        Alert.alert('Error', error.message);
      });
  }

  async function getData() {
    setLoading(true);
    let user = auth().currentUser;
    if (user != null) {
      setEmail(user.email);
      setPhoto(user.photoURL);
    }
    await ref
      .doc(user.email)
      .get()
      .then((doc) => {
        if (doc.exists) {
          var data = doc.data();
          setName(data.name);
          setPhone(data.phone);
        }
      })
      .catch((err) => {
        console.log('Error getting document', err);
      });
    setLoading(false);
  }
  // Change Phone
  const changePhone = (phone) => {
    setLoading(true);
    setPhoneEdit(false);
    ref
      .doc(user.email)
      .update({ phone: phone })
      .then(() => {
        getData();
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert('Error', 'Something went wrong');
      });
  };
  // Change Name
  const changeName = (name) => {
    setLoading(true);
    setNameEdit(false);
    ref
      .doc(user.email)
      .update({ name: name })
      .then(() => {
        getData();
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert('Error', 'Something went wrong');
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Loading loading={loading} />
      <View style={styles.header}>
        <View>
          <TouchableOpacity
            onPress={() =>
              ImagePicker.showImagePicker(
                (options1,
                  (response) => {
                    if (response.didCancel) {
                      console.log('User cancelled image picker');
                    } else if (response.error) {
                      console.log('ImagePicker Error: ', response.error);
                    } else {
                      user
                        .updateProfile({
                          photoURL: response.uri,
                        })
                        .then(function () {
                          getData();
                          Alert.alert('Success', 'Photo Updated.');
                        })
                        .catch(function (error) {
                          Alert.alert('Error', errr.message);
                        });
                    }
                  }),
              )
            }>
            {photo === null ? (
              <Image
                style={styles.avatar}
                source={require('../assets/profile.png')}
              />
            ) : (
                <Image style={styles.avatar} source={{ uri: photo }} />
              )}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.name}>{name}</Text>
          <Icon
            type="AntDesign"
            name="edit"
            size={15}
            color={PRIMARY_COLOR}
            iconStyle={styles.nameEdit}
            onPress={() => setNameEdit(true)}
          />
        </View>
      </View>
      <View style={styles.bodyContent}>
        <View style={styles.emailContainer}>
          <View style={styles.iconRow}>
            <Icon name="email" underlayColor="transparent" style={{ marginLeft: -30 }} color={PRIMARY_COLOR} />
          </View>
          <View style={styles.emailRow}>
            <Text style={styles.emailText}>{email}</Text>
          </View>
        </View>
        <View style={styles.emailContainer}>
          <View style={styles.iconRow}>
            <Icon name="call" underlayColor="transparent" style={{ marginLeft: -30 }} color={PRIMARY_COLOR} />
          </View>
          <View
            style={[
              styles.emailRow,
              { flexDirection: 'row', justifyContent: 'space-between' },
            ]}>
            <Text style={styles.emailText}>{phone}</Text>
            <Icon
              type="AntDesign"
              name="edit"
              color={PRIMARY_COLOR}
              onPress={() => setPhoneEdit(true)}
            />
          </View>
        </View>
      </View>
      
      <View style={styles.links}>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <TouchableOpacity
            style={{ backgroundColor: PRIMARY_COLOR, marginRight: 10, borderRadius: 5 }}
            onPress={() => navigation.navigate('Reset Password')}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.link}>Reset Password</Text>
              <Icon
                type="FontAwesome"
                name="settings"
                size={20}
                style={{ padding: 7 }}
                color={SECONDARY_COLOR}
              />
            </View>
          </TouchableOpacity>

        <TouchableOpacity
          style={{ backgroundColor: PRIMARY_COLOR, marginRight: 10, borderRadius: 5 }}
          onPress={() =>
            Share.open(options)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                err && console.log(err);
              })}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.link}>Share App</Text>
            <Icon
              type="Entypo"
              name="share"
              size={20}
              style={{ padding: 7 }}
              color={SECONDARY_COLOR}
            />
          </View>
        </TouchableOpacity>

      </View>

      <View
        style={{ width: "100%", height: "60%", marginTop: 20, alignItems: "center", justifyContent: "flex-end" }}
      >
        <Text
          style={{
            padding: 15,
            fontSize: 12,
            fontWeight: "bold",
            color: PRIMARY_COLOR,
          }}
        >
          REACH OUT TO US
          </Text>
        <View
          style={{
            width: "50%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("whatsapp://send?phone=+923187504355&")
            }
          >
            <Image
              style={{
                width: 30,
                height: 30
              }}
              source={require("../assets//whatsapp.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              //Linking.openURL("https://www.facebook.com/LockStock.Ecom/")
            }}
          >
            <Image
              style={{
                width: 30,
                height: 30
              }}
              source={require("../assets/facebook.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // Linking.openURL(
              //   "https://www.instagram.com/lockstock.official/"
              // )
            }}
          >
            <Image
              style={{
                width: 30,
                height: 30
              }}
              source={require("../assets/instagram.png")}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{ width: "100%", paddingTop: 10, alignItems: "center" }}
        >
          <Text style={{ fontSize: 10, color: "#bfbfbf" }}>
            Version 1.0
            </Text>
        </View>

        <View
          style={{ width: "100%", paddingTop: 10, alignItems: "center" }}
        >
          <Text style={{ fontSize: 10, color: PRIMARY_COLOR }}>
            Copyright © 2020  A.S.K. All rights reserved.
            </Text>
        </View>
      </View>

      <DialogInput
        isDialogVisible={isDialogVisible}
        title={'Reset Password'}
        hintInput={'Enter New Password'}
        submitInput={(inputText) => resetPassword(inputText)}
        closeDialog={() => hideDialog()}
      />

      <DialogInput
        isDialogVisible={phoneEdit}
        title={'Change Phone'}
        hintInput={'Enter New Phone'}
        textInputProps={{ keyboardType: 'phone-pad' }}
        submitInput={(inputText) => changePhone(inputText)}
        closeDialog={() => setPhoneEdit(false)}
      />

      <DialogInput
        isDialogVisible={nameEdit}
        title={'Change Name'}
        hintInput={'Enter New Name'}
        submitInput={(inputText) => changeName(inputText)}
        closeDialog={() => setNameEdit(false)}
      />
    </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: SECONDARY_COLOR,
    flexDirection: 'column',
    flex: 1,
  },

  header: {
    marginTop: 50,
    alignItems: 'center',
    flex: 3,
  },

  avatar: {
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    width: 120,
    height: 120,
    borderRadius: 63,
  },

  bodyContent: {
    alignItems: 'center',
    marginTop: 25,
    borderBottomColor: PRIMARY_COLOR,
    borderWidth: 1,
    marginHorizontal: 30,
    paddingHorizontal: 20,
    borderRadius: 15
  },

  name: {
    fontSize: 23,
    color: PRIMARY_COLOR,
    fontWeight: '600',
    marginTop: 5,
  },

  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
  emailRow: {
    flex: 8,
    flexDirection: 'column',
  },
  emailContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  emailText: {
    fontSize: 16,
  },

  links: {
    flex: 5,
    margin: 10,
    alignItems: 'center',
  },

  link: {
    fontSize: 13,
    color: SECONDARY_COLOR,
    marginBottom: 5,
    padding: 7,
    alignSelf: 'center'
  },
  nameEdit: {
    paddingTop: 8,
  },
});

export default Profile;
