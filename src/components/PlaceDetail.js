import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import AntDesigns from 'react-native-vector-icons/AntDesign'
//import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { PRIMARY_COLOR, SECONDARY_COLOR, ASSET_COLOR } from '../utils/colors';

export default class PlaceDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.route.params.name,
            image: this.props.route.params.image,
            description: this.props.route.params.description
        };
    }

    render() {

        let IMAGE = '';
        if (this.state.image !== null) {
            IMAGE = { uri: this.state.image };
        }


        if (this.state.isOpenMode) {
            return (
                <View style={{ backgroundColor: '#ecf0f1', }}>
                    <Modal isVisible={true} transparent={true} >
                        <View style={{ flex: 0.7 }}>
                            <View style={{ alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={() => { this.setState({ isOpenMode: false }) }} >
                                    <AntDesigns name="closecircle" size={25} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>

                                {/* <SliderBox
                                    images={ALL_IMAGES}
                                    height={200}
                                    parentWidth={320}
                                    sliderBoxHeight={'100%'}
                                    dotColor="white"
                                    autoplay
                                    circleLoop
                                    resizeMethod={'resize'}
                                    resizeMode={'cover'}
                                    ImageComponentStyle={{ borderRadius: 0, }}
                                    inactiveDotColor="#90A4AE"
                                    dotStyle={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: 15,
                                        marginHorizontal: 0,
                                        padding: 0,
                                        marginBottom: 0,

                                    }}
                                /> */}
                            </View>

                        </View>
                    </Modal>

                </View>


            )
        }

        return (
            <View style={styles.container}>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.HeaderContainer}>
                        <TouchableOpacity style={styles.arrowBtn} onPress={() => { this.props.navigation.goBack() }}>
                            <AntDesigns name="left" size={20} color={PRIMARY_COLOR} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.HeaderContainer}>

                        <Text style={styles.RentTxt}>{this.state.name}</Text>

                    </View>

                </View>

                <View style={{ width: Dimensions.get('window').width, marginBottom: 10, marginHorizontal: 5 }}>
                    <Image
                        resizeMode="cover"
                        style={styles.LiveAutionImg}
                        source={IMAGE}
                    />
                </View>
                <View style={{ flex: 1, marginTop: -5, marginHorizontal: 5, borderRadius: 15, backgroundColor: PRIMARY_COLOR }}>
                    <View style={styles.homeInpectionHeadingView}>
                        <Text style={styles.generaltxt}>About this place</Text>
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
            </View >
        );
    }
}

const styles = StyleSheet.create({
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

    LiveAutionImg: {
        height: 200,
        width: 350,
    },

    inspectionLoingDetailsTxt: {
        fontSize: 15,
        color: SECONDARY_COLOR,
        textAlign: 'justify'
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
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
});


