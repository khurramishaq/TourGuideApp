import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import AntDesigns from 'react-native-vector-icons/AntDesign'
//import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { PRIMARY_COLOR, SECONDARY_COLOR, ASSET_COLOR } from '../utils/colors';
import { SliderBox } from 'react-native-image-slider-box';

export default class HotelDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.route.params.name,
            swiper: this.props.route.params.swiper,
            description: this.props.route.params.description,
            price: this.props.route.params.price
        };
    }

    render() {

        let IMAGE = '';
        if (this.state.image !== null) {
            IMAGE = { uri: this.state.image };
        }

        return (
            <View style={styles.container}>

                <View style={{ flexDirection: "row", backgroundColor: SECONDARY_COLOR }}>
                    <View style={styles.HeaderContainer}>
                        <TouchableOpacity style={styles.arrowBtn} onPress={() => { this.props.navigation.goBack() }}>
                            <AntDesigns name="left" size={20} color={PRIMARY_COLOR} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.HeaderContainer}>

                        <Text style={styles.RentTxt}>{this.state.name}</Text>

                    </View>

                </View>

                <View style={styles.image}>
                    <SliderBox
                        images={this.state.swiper}
                        sliderBoxHeight={200}
                        parentWidth={350}
                        imageLoadingColor={PRIMARY_COLOR}
                        dotColor={PRIMARY_COLOR}
                    />
                </View>

                <View style={{ flex: 1, marginTop: -15, marginHorizontal: 5, borderRadius: 15, backgroundColor: PRIMARY_COLOR }}>
                    <View style={styles.homeInpectionHeadingView}>
                        <Text style={styles.generaltxt}>Price range</Text>
                    </View>


                    <View style={styles.homeInpectionHeadingView}>
                        <Text style={styles.inspectionLoingDetailsTxt}>{this.state.price}</Text>

                    </View>

                    <View style={styles.homeInpectionHeadingView}>
                        <Text style={styles.generaltxt}>About this hotel</Text>
                    </View>

                    <ScrollView>
                        <View style={styles.homeInpectionHeadingView}>
                            <Text style={styles.inspectionLoingDetailsTxt}>{this.state.description}</Text>
                        </View>

                        {/* <View style={{ borderTopWidth: 1, marginVertical: 5, marginHorizontal: 10, borderTopColor: '#F3F6F9', borderRadius: 10, }}>
                            <MapView
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={styles.map}
                                region={{
                                    latitude: parseFloat(latitude),
                                    longitude: parseFloat(longitude),
                                    latitudeDelta: 0.0800,
                                    longitudeDelta: 0.0200,
                                }}
                            >
                                <Marker
                                    // key={maker.id}

                                    coordinate={{ latitude: parseFloat(latitude), longitude: parseFloat(longitude) }}
                                >
                                </Marker>
                            </MapView>
                        </View> */}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: SECONDARY_COLOR,
        flex: 1
    },

    MapContainer: {
        ...StyleSheet.absoluteFillObject,
        height: Dimensions.get('window').height / 3,
        width: Dimensions.get('window').width - 20,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        // ...StyleSheet.absoluteFillObject,
        height: Dimensions.get('window').height / 4,
        width: Dimensions.get('window').width - 20,

    },
    HeaderContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 10

    },
    arrowBtn: {
        padding: 10,
        borderRadius: 10,
        elevation: 2,
        backgroundColor: '#F2F3F5'
    },

    inspectionLoingDetailsTxt: {
        fontSize: 15,
        color: SECONDARY_COLOR,
        textAlign: 'justify',
        marginBottom: 10
    },

    inspectionlongDetailContainer: {
        marginHorizontal: 15,
        marginVertical: 20,
        backgroundColor: 'white'
    },
    homeInpectionHeadingView: {
        marginTop: 10,
        marginBottom: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    generaltxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: SECONDARY_COLOR

    },
    RentTxt: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingRight: 10,
        color: PRIMARY_COLOR

    },
    sliderContainer: {
        // flex: 1,
        height: Dimensions.get('window').height / 3,
        // height:300,
        marginHorizontal: 5,
        marginBottom: 3,
        borderRadius: 20

    },
    leftArrowBtn: {
        padding: 10,
        borderRadius: 10,
        elevation: 2,
        backgroundColor: '#F2F3F5'
    },
    text: {
        fontSize: 10,
        color: 'white',
        marginVertical: 5
    },
    headingTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        // color: '#E15A28'
        color: 'black'
    },
    RentContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 5
    },
    RentBtn: {
        backgroundColor: 'black',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
        height: 25
    },
    image: {
        marginBottom: 20,
        marginLeft: 5,
        justifyContent: 'center',
    },
});


