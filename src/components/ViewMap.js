import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export default function ViewMap({ route }) {

  const { searchedPlace, nearBy } = route.params;

  // useEffect(() => {
  //   alert(JSON.stringify(nearBy));
  // }, [])

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={false}
        //ref={map => this._map = map}
        style={styles.map}
        region={{
          latitude: searchedPlace.location.latitude,
          longitude: searchedPlace.location.longitude,
          latitudeDelta: searchedPlace.viewport.latitudeNE - searchedPlace.viewport.latitudeSW,
          longitudeDelta: searchedPlace.viewport.longitudeNE - searchedPlace.viewport.longitudeSW,
        }}
      >
        <Marker
          title={searchedPlace.name}
          pinColor='#0077ff'
          coordinate={{
            latitude: searchedPlace.location.latitude,
            longitude: searchedPlace.location.longitude,
          }}>
        </Marker>

        {nearBy.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.geometry.location.lat,
              longitude: marker.geometry.location.lng
            }}
            title={marker.name}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:
  {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white'
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  }
});