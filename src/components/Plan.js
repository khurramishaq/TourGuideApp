import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'native-base';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../utils/colors';

class Plan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedPlace: props.route.params.plan.searchedPlace,
      distanceFromSelectedPlace:
        props.route.params.plan.distanceFromSelectedPlace,
      durationFromSelectedPlace:
        props.route.params.plan.durationFromSelectedPlace,
      nearbyRestaurantsOfPlace:
        props.route.params.plan.nearbyRestaurantsOfPlace
    };
  }
  render() {

    const { navigation } = this.props;

    const {
      searchedPlace,
      distanceFromSelectedPlace,
      durationFromSelectedPlace,
      nearbyRestaurantsOfPlace,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 7 }}>
            <Text style={{ fontSize: 11, color: PRIMARY_COLOR }}>
              Place ID: {searchedPlace.placeID}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 22, color: PRIMARY_COLOR }}>
              {searchedPlace.name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon type="AntDesign" name="star" style={{ fontSize: 12, color: PRIMARY_COLOR }} />
              <Text style={{ fontSize: 16, color: PRIMARY_COLOR }}> {searchedPlace.rating}</Text>
              <Text style={{ color: PRIMARY_COLOR }}>, </Text>
              <Icon
                type="MaterialIcons"
                name="location-on"
                style={{ fontSize: 12, color: PRIMARY_COLOR }}
              />
              <Text style={{ fontSize: 14, color: PRIMARY_COLOR }}>{searchedPlace.address}</Text>
            </View>
          </View>
          <View style={{ flex: 3 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Map View', {
                searchedPlace: searchedPlace,
                nearBy: nearbyRestaurantsOfPlace
              })}
              style={{ marginLeft: 30 }}>
              <Image
                style={{ height: 50, width: 50, alignSelf: 'center' }}
                source={require('../assets/map.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10, color: PRIMARY_COLOR }}>
          Nearby Hotels/Restaurants &amp; Places
        </Text>
        <FlatList
          data={nearbyRestaurantsOfPlace}
          contentContainerStyle={{
            backgroundColor: PRIMARY_COLOR,
            borderRadius: 5,
            marginTop: 10,
          }}
          renderItem={(item) => {
            let place = item.item;
            return (
              <View
                style={{
                  borderRadius: 5,
                  padding: 10,
                }}>
                <Text style={{ fontSize: 10, color: '#fcc102' }}>
                  Place ID: {place.place_id}
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: SECONDARY_COLOR }}>
                  {place.name}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon type="AntDesign" name="star" style={{ fontSize: 12, color: SECONDARY_COLOR }} />
                  <Text style={{ fontSize: 14, color: SECONDARY_COLOR}}> {place.rating ? place.rating : 0}</Text>
                  <Text style={{ color: SECONDARY_COLOR}}>, </Text>
                  <Icon
                    type="MaterialIcons"
                    name="location-on"
                    style={{ fontSize: 12, color: SECONDARY_COLOR}}
                  />
                  <Text style={{ fontSize: 12, color: SECONDARY_COLOR }}>{place.vicinity}</Text>
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => 'TGA' + index}
        />
        <View
          style={{
            // position: 'absolute',
            // bottom: 0,
            // left: 0,
            // right: 0,
            paddingTop: 10,
            borderTopWidth: 2,
            borderTopColor: PRIMARY_COLOR,
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: '#fcc102' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', color: PRIMARY_COLOR }}>
                {distanceFromSelectedPlace.text}
              </Text>
              <Text style={{ color: PRIMARY_COLOR }}>Distance</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', color: PRIMARY_COLOR }}>
                {durationFromSelectedPlace.text}
              </Text>
              <Text style={{ color: PRIMARY_COLOR }}>Duration</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', color: PRIMARY_COLOR }}>
                {(((distanceFromSelectedPlace.value / 1000) / 13) * 105).toFixed(2)}
              </Text>
              <Text style={{ color: PRIMARY_COLOR }}>Travel Cost</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default Plan;
