import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, PixelRatio, TextInput, Image, ScrollView, ImageBackground, Dimensions, FlatList } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import { AuthContext } from '../../navigation/AuthProvider'
import BaseScreen from '../../components/BaseScreen'
import Input from '../../components/Input'
import Button from '../../components/Button'
import moment from 'moment/moment'
import Swiper from 'react-native-swiper'
import Data from '../../Data.js/Homedata'

import RazorpayCheckout from 'react-native-razorpay'

const themeColor = '#F5CF04'



const HomeScreen = ({ navigation }) => {
    return (
        <BaseScreen
            logo={
                <TouchableOpacity onPress={() => { }}>
                    <Text style={{
                        // fontSize: 22,
                        fontSize: PixelRatio.getPixelSizeForLayoutSize(8.5),
                        color: '#000', fontFamily: "Roboto-Bold"
                    }}>Home</Text>

                </TouchableOpacity>
            }
            renderChild={Content({ navigation })} navigation={navigation} leftButton={'menu'} paddingTop={false} paddingHorizontal={false}
            rightButton={
                <TouchableOpacity onPress={() => { navigation.navigate('Filter') }}>
                    <MaterialIcons name="filter-list" size={25} color={'#6495ed'}></MaterialIcons>
                </TouchableOpacity>} />
    )
}



const Content = ({ navigation }) => {

    const { BaseUrl, appData, } = useContext(AuthContext)

    const activeColor = "#F5CF04"

    const [search, setSearch] = useState('')
    const renderItem = ({ item }) => {
        return (
            <View style={styles.contentScroll}>
            <TouchableOpacity style={styles.cardWrapper} onPress={() =>
                navigation.navigate('Product Details', {
                 orderid: item.id
                })
                }>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.subHeading, { marginTop: 15 }]}>{item.title}</Text>
                    <Text style={[styles.time, { marginTop: 15 }]}>{item.time}</Text>
                </View>
                <Text style={styles.category}>{item.category}</Text>
                <View style={styles.location}>
                    <MaterialIcons name="location-on" size={28} />
                    <Text style={styles.locationTxt}>{item.location}</Text>
                </View>
                <View style={styles.credits} >
                    <MaterialIcons name="credit-card" size={26} />
                    <Text style={styles.creditsTxt}>{item.credits}</Text>
                </View>
            </TouchableOpacity>
            </View>
        )
    }




    return (
        <View>
            <FlatList
            showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                data={Data}
                renderItem={renderItem}
            />

        </View>

    )
}

export default HomeScreen

const styles = StyleSheet.create({
    contentScroll: {
        display: 'flex',
        width: '100%',
        position: 'relative',
    },
    

    category: {
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        color: '#000',
        marginTop: 4
        

    },

    subHeading: {
        fontSize: 22,
        color: '#000',
        fontFamily: "Roboto-Medium",
    },
    cardWrapper: {
        alignSelf: "center",
        display: 'flex',
        // paddingHorizontal: 20,
        width: '100%',
        marginBottom: 5,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#ECECEC',
        marginHorizontal: 30,
        
    },
    location: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 6,
        
    },

    locationTxt: {
        fontSize:16,
        color: '#696969'
    }
    ,
    credits: {
        paddingVertical: 4,
        flexDirection: 'row',
        marginLeft: 4
    }
    ,
    creditsTxt: {
        fontSize: 18,
        color: '#696969'
    }
,
time:{
    color: '#a9a9a9'
}

})