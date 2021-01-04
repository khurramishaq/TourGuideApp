import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableWithoutFeedback, Dimensions, Alert, ToastAndroid, AlertIOS, } from 'react-native'
import { PRIMARY_COLOR, SECONDARY_COLOR, ASSET_COLOR } from '../utils/colors';
const PlaceCard = ({ hotel, navigation }) => {

    let item = hotel;
    let { name } = item;
    let { description } = item;
    let { image } = item;
    let { price } = item;
    let { swiper } = item;


    let IMAGE = '';


    if (image !== null) {
        IMAGE = { uri: image };
    }


    return (


        <View style={{ ...styles.AutionimgContainer }}>
            <View style={styles.LiveAutionImgContainer}>
                <TouchableWithoutFeedback
                onPress={() => {
                    navigation.navigate('Hotel Detail', {
                        swiper: swiper,
                        name: name,
                        description: description,
                        price: price
                    })
                }}
                >
                    <Image
                        resizeMode="cover"
                        style={styles.LiveAutionImg}
                        source={IMAGE}
                    />
                </TouchableWithoutFeedback>
            </View>

            <View style={styles.LiveAuctionContentContainer}>
                <View style={styles.PricingContainer}>
                    <Text style={styles.Rent}>{name}</Text>
                </View>
            </View>


        </View>




    );
}


const HEIGHT = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    pageContent: {
        flex: 3,
        backgroundColor: 'white',
        // borderWidth:1
    },
    faltListContainer: {
        height: 230,
    },
    flatListrow: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 2

    },
    flatlistHeading: {
        flex: 3,

    },
    flatListViewAllBtnContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    countNeighborhood:
    {
        fontWeight: '100',
        fontSize: 15,
        color: '#808080'

    },
    imgContainer: {
        height: 150,
        width: 190,
        marginRight: 10,
        marginTop: 3,
        marginLeft: 10,
        alignItems: 'flex-start',
        borderRadius: 15,
        elevation: 3,
        backgroundColor: "white"

    },
    AutionfaltListContainer: {
        height: (HEIGHT / 2) + 15,
        marginBottom: 5,
        marginTop: 2,

    },
    AutionimgContainer: {

        height: (HEIGHT / 6) + 60,
        width: Dimensions.get('screen').width - 20,
        marginRight: 5,
        marginTop: 10,
        marginLeft: 10,
        borderRadius: 15,
        elevation: 3,
        backgroundColor: PRIMARY_COLOR,
        marginBottom: 5,
        flex: 1,
    },
    LiveAutionImgContainer: {
        flex: 8,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        backgroundColor: 'white',
        //testing

    },
    LiveAuctionContentContainer: {
        flex: 2,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    LiveAutionImg: {

        height: '100%',
        width: '100%',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,

    },
    AuctionMsgContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        flexDirection: 'row'
    },
    AuctionMsg: {
        backgroundColor: '#E15A28',
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: 0,
        justifyContent: 'center'
    },
    AuctionTime: {
        backgroundColor: '#585858',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    featureIconContainer: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10
    },
    PricingContainer: {
        marginHorizontal: 5,
        marginVertical: 5
    },
    Rent: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: SECONDARY_COLOR
    },
    PrYear: {
        fontSize: 15,
        fontWeight: 'normal',
        color: '#808080'
    },
    town: {
        fontSize: 12,
        fontWeight: '500',

    },
    apartment: {
        color: '#808080',
        fontSize: 12,

    },
    promotion: {
        fontSize: 12,
        color: 'black',
        paddingBottom: 2,
        // 
    },
    whyLookIn: {
        height: 270,
        width: 220,
        marginRight: 10,
        marginTop: 10,
        marginLeft: 10,
        borderRadius: 30,
        elevation: 1,

    },
    whyLookInImgContainer: {
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,

    },
    whyLookInContentContainer: {
        flex: 1,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    buildingImgContainer: {
        height: 110,
        width: 110,
        // marginRight: 10,
        marginTop: 3,
        marginLeft: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10,
    },
    buildingFlatListImg:
    {
        height: 110,
        width: 110,
        borderRadius: 15
    },
    buildingImgText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        // paddingLeft: 10,
        alignItems: 'center',
        marginBottom: 5
    }
})
export default PlaceCard;