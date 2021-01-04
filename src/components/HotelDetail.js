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
                <ScrollView>
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.HeaderContainer}>
                            <TouchableOpacity style={styles.arrowBtn} onPress={() => { this.props.navigation.goBack() }}>
                                <AntDesigns name="left" size={20} />
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

                    <View style={{ borderTopWidth: 1, marginVertical: 5, marginHorizontal: 10, borderTopColor: '#F3F6F9' }}>

                        <View style={styles.homeInpectionHeadingView}>
                            <Text style={styles.generaltxt}>Price range</Text>
                        </View>


                        <View style={styles.homeInpectionHeadingView}>
                            <Text style={styles.inspectionLoingDetailsTxt}>{this.state.price}</Text>

                        </View>


                        <View style={styles.homeInpectionHeadingView}>
                            <Text style={styles.generaltxt}>About this hotel</Text>
                        </View>


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

                    </View>
                </ScrollView>
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
    footeBtntxt: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    footeBtn: {
        backgroundColor: '#0077ff',
        paddingTop: 10,
        borderRadius: 25,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    footerBtnContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fooetrShortTxt: {
        fontSize: 10
    },
    footerGetStartText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    footerGetStartContainer: {
        flex: 1
    },
    footerContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 10
    },
    footer: {
        position: 'absolute',
        flex: 0.1,
        left: 0,
        right: 0,
        bottom: -10,
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 70,
        alignItems: 'center',
        elevation: 3,
    },
    LandloardTxt: {
        fontSize: 15,

    },
    LandLordListBtn: {
        marginHorizontal: 10
    },
    LandloardListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    BuildingAdressDetailView: {
        flex: 1,
    },
    BuildingAdressView: {
        flex: 2,
        marginBottom: 10
    },
    BuildingAdressDetails: {
        fontSize: 12,
        fontWeight: '100',

    },
    BuildingAdress: {

        fontSize: 10,
        fontWeight: '300',
        color: '#808080'
    },
    BuildingAddressContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    KamoonTxt: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    KamoonContainer: {
        marginHorizontal: 10,
        marginVertical: 5
    },
    BuildingContentContainer: {
        flex: 4,
        backgroundColor: 'white'
    },
    BuildingImageConatiner: {
        flex: 2,

        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,

    },
    BuildngRow: {
        flexDirection: 'row',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Buildingcard: {
        borderRadius: 20,
        elevation: 2,
        paddingTop: 2,
        backgroundColor: 'white'
    },
    BuildingContainer: {
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 100
    },
    landLordTermsContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomColor: '#F3F6F9',
        borderBottomWidth: 1

    },

    MoreDetailsTxt: {
        fontSize: 25,
        fontWeight: 'bold',

    },

    MoreDetailView: {
        marginVertical: 10,
        marginHorizontal: 10,
    },

    MoreDetailsContainer: {
        paddingTop: 30,
        borderTopColor: '#F3F6F9',
        borderTopWidth: 1,
    },




    LiveAutionImg: {

        height: 200,
        width: 350,

    },

    whatLookinInspectionContainer: {
        marginHorizontal: 10,
        marginVertical: 30,
    },

    inspectionLoingDetailsTxt: {
        fontSize: 15,
        color: PRIMARY_COLOR,
        textAlign: 'justify'
    },
    inspectionlongDetailContainer: {
        marginHorizontal: 15,
        marginVertical: 20,
        backgroundColor: 'white'
    },
    StutsContainer: {
        flex: 5,
        marginLeft: 20
    },
    CircleContainer: {
        flex: 1,
        marginLeft: 10
    },
    homeInpectionHeadingView: {
        marginTop: 10,
        marginBottom: 5
    },
    inspectionStatusDetailsTxt: {
        fontSize: 15,
        color: '#D6ECE9',
        marginVertical: 10
    },
    inspectionStatustxt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    StarCircleView: {
        borderRadius: 30,
        padding: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    HomeIspectionRow: {
        backgroundColor: '#0077ff',
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,


    },
    HomeInspectionContainer: {
        marginHorizontal: 10,
        borderTopWidth: 1,
        borderTopColor: '#F3F6F9',


    },
    headingBoldTxt: {
        fontSize: 12,
        fontWeight: 'bold',
        marginRight: 3,
        marginLeft: 6,
    },
    headingGernnalFeatureName: {
        fontSize: 13
    },
    generalIconView: {
        flexDirection: 'row',

    },
    generalViewRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5

    },
    generaltxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: PRIMARY_COLOR

    },
    generalHeadingContainer: {
        marginTop: 5
    },
    generalItemsContainer: {
        marginHorizontal: 10,

        marginVertical: 10,
        paddingBottom: 10,
        borderBottomColor: '#F3F6F9',
    },
    generalContianer: {
        marginHorizontal: 10,
    },
    trakheesiTxt: {
        color: '#808080'
    },
    trakheesiContainer: {
        marginHorizontal: 10,
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F6F9',
    },
    floorTxt: {

    },
    floorContainer: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    mainHeadingTxt: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black'
    },
    mainHeading: {
        marginHorizontal: 10,
        marginVertical: 5
    },
    apartmentBold: {
        fontSize: 10,
        fontWeight: 'bold'
    },
    btnYerlyAndMonthly: {
        fontSize: 12,
        fontWeight: '100',
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 0,
        paddingBottom: 0
    },
    RentTxt: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingRight: 10,
        color: PRIMARY_COLOR

    },
    apartmentTxt: {
        fontSize: 10,
        fontWeight: '100',
        color: '#808080'
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    sliderContainer: {
        // flex: 1,
        height: Dimensions.get('window').height / 3,
        // height:300,
        marginHorizontal: 5,
        marginBottom: 3,
        borderRadius: 20

    },
    pageContentContainer: {
        flex: 1,
        backgroundColor: 'white',

    },
    shareableBtnContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    },
    row: {
        height: 50,
        flexDirection: 'row',
    },
    leftArrowContainer: {
        flex: 1,
        paddingLeft: 10,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    leftArrowBtn: {
        padding: 10,
        borderRadius: 10,
        elevation: 2,
        backgroundColor: '#F2F3F5'
    },
    rightBtnsContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    rightBtnRow: {
        flexDirection: 'row'
    },
    shareBtn: {
        padding: 10,
        borderRadius: 10,
        elevation: 2,
        backgroundColor: '#F2F3F5'
    },
    heartBtn: {
        marginRight: 10,
        marginLeft: 20,
        padding: 10,
        borderRadius: 10,
        // backgroundColor: 'grey',
        // borderColor: 'grey',

        elevation: 2,
        backgroundColor: '#F2F3F5'
    },
    actionbtnsSection: {
        // position: 'absolute',
        // bottom: 0,
        // height: 80,
        width: '100%',
    },
    actionBtnContainer: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#0077ff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    actionBtnRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        marginHorizontal: 10
    },
    actionBtnView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    camera: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        padding: 10,
        // borderWidth: 1
    },
    gallery: {
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 10
    },
    streetView: {
        // borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        padding: 10
    },
    text: {
        fontSize: 10,
        color: 'white',
        marginVertical: 5
    },
    headingContainer: {
        flexDirection: 'row',
        // borderWidth: 1,
        marginTop: 30,
        marginBottom: 10,
        // backgroundColor: 'red'
    },
    headingView: {
        marginHorizontal: 10
    },
    headingTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        // color: '#E15A28'
        color: 'black'
    },
    timeLeftContainer: {
        backgroundColor: '#FAF6DD',
        width: 100,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    timeLeftTxt: {
        fontSize: 15,
        color: '#E15A28',
        fontWeight: '100'
    },
    RentContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 5


    },
    RentBtnContainer: {
        flexDirection: 'row',

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
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 2.5,
        justifyContent: 'center',
    },
});


