import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  FlatList
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Icon } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import { PRIMARY_COLOR, SECONDARY_COLOR, ASSET_COLOR } from '../utils/colors';
import Loading from './common/Loading';
import HotelCard from './HotelCard';
const ref = firestore().collection('Area');

class Hotels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Area: [],
      City: [],
      dataArray: [],
      selectedArea: '',
      selectedCity: '',
      loading: false,
    };
  }

  async getAllHotels() {
    this.setState({ loading: true });
    await ref.get().then((querySnapshot) => {
      const temp = [];
      querySnapshot.forEach(async (doc1) => {
        await ref
          .doc(doc1.id)
          .collection('City')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(async (doc2) => {
              await ref
                .doc(doc1.id)
                .collection('City')
                .doc(doc2.id)
                .collection('Hotels')
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    const swiperimg = [];
                    for (let i = 0; i < doc.data().image.length; i++) {
                      swiperimg.push(doc.data().image[i]);
                    }
                    temp.push({
                      name: doc.data().Name,
                      description: doc.data().Description,
                      price: doc.data().Price,
                      swiper: swiperimg,
                      image: doc.data().image[0]
                    });
                  });
                  this.setState({ dataArray: temp, loading: false });
                });
            });
          });
      });
    });
  }

  async loadAreas() {
    await ref.get().then((querySnapshot) => {
      const tempDoc = [];
      querySnapshot.forEach((doc) => {
        tempDoc.push({ label: doc.id, value: doc.id });
      });
      this.setState({ Area: tempDoc });
    });
  }

  async LoadCities(area) {
    await ref
      .doc(area)
      .collection('City')
      .get()
      .then((querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((doc) => {
          cities.push({ label: doc.id, value: doc.id });
        });

        this.setState({ City: cities });
      });
  }

  async filteredHotels(area, city) {
    this.setState({ loading: true })
    await ref
      .doc(area)
      .collection('City')
      .doc(city)
      .collection('Hotels')
      .get()
      .then((querySnapshot) => {
        const filteredHotels = [];
        querySnapshot.forEach((doc) => {
          const swiperimg = [];
          for (let i = 0; i < doc.data().image.length; i++) {
            swiperimg.push(doc.data().image[i]);
          }

          filteredHotels.push({
            name: doc.data().Name,
            description: doc.data().Description,
            price: doc.data().Price,
            swiper: swiperimg,
            image: doc.data().image[0]
          });
        });

        this.setState({ dataArray: filteredHotels, loading: false });
      });
  }

  componentDidMount() {
    this.getAllHotels();
    this.loadAreas();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.filter}>
          <View style={styles.area}>
            <RNPickerSelect
              placeholder={{
                label: 'Area',
                value: null,
                color: PRIMARY_COLOR,
              }}
              style={pickerStyles1}
              onValueChange={(value) =>
                this.LoadCities(value) && this.setState({ selectedArea: value })
              }
              useNativeAndroidPickerStyle={false}
              items={this.state.Area}
              Icon={() => {
                return (
                  <Icon
                    type="AntDesign"
                    name="caretdown"
                    style={{ fontSize: 12, color: PRIMARY_COLOR }}
                  />
                );
              }}
            />
          </View>
          <View style={styles.city}>
            <RNPickerSelect
              placeholder={{
                label: 'City',
                value: null,
                color: PRIMARY_COLOR,
              }}
              style={pickerStyles1}
              onValueChange={(value) => {
                this.filteredHotels(
                  this.state.selectedArea,
                  value,
                );
              }}
              useNativeAndroidPickerStyle={false}
              items={this.state.City}
              Icon={() => {
                return (
                  <Icon
                    type="AntDesign"
                    name="caretdown"
                    style={{ fontSize: 12, color: PRIMARY_COLOR }}
                  />
                );
              }}
            />
          </View>

        </View>
        <View style={styles.list}>
          <Loading loading={this.state.loading} />

          <ScrollView scrollEventThrottle={16}>
            {this.state.dataArray != null && this.state.dataArray.length > 0 ?
              <FlatList
                data={this.state.dataArray}
                renderItem={({ item, index }) => {
                  return <HotelCard key={index} hotel={item} navigation={this.props.navigation} />
                }}
                keyExtractor={index => index}
                style={styles.flatList}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                marginBottom={0}
              />
              : null}
          </ScrollView>

        </View>
      </View>
    );
  }
}

const pickerStyles1 = {
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: PRIMARY_COLOR,
    color: PRIMARY_COLOR,
    width: '100%',
    height: 35,
    borderRadius: 10
  },

  iconContainer: {
    top: 10,
    right: 10,
  },

  placeholder: {
    color: PRIMARY_COLOR,
    fontSize: 15,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: SECONDARY_COLOR,
  },

  filter: {
    flex: 1,
    flexDirection: 'row',
    marginTop: -5
  },

  list: {
    flex: 9,
  },

  area: {
    flex: 5,
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 2.5
  },

  city: {
    flex: 5,
    justifyContent: 'center',
    marginRight: 5,
    marginLeft: 2.5
  }
});

export default Hotels;
