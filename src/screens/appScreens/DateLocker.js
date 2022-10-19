import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, PixelRatio, TextInput, Image, ScrollView, ImageBackground, Dimensions } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import { AuthContext } from '../../navigation/AuthProvider'
import BaseScreen from '../../components/BaseScreen'
import Input from '../../components/Input'
import Button from '../../components/Button'
import moment from 'moment/moment'
import Data from '../../Data.js/Homedata'
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { LocationPermission } from './LocationPermission'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import Toast from '../../components/Toast'

const themeColor = '#F5CF04'




const DateLocker = ({ navigation, route }) => {


    const id = route.params.orderid

    const selectedData = Data.find((element) => {
        return id === element.id;
    });




    // map code start
    // const [coords, setCoords] = useState()
    const [myLocation, setMyLocation] = useState(0)
    const [toast, setToast] = useState(0)
    const [selected, setSelected] = useState(1)

    // const { latitude, longitude } = coords

    const addresses = [
        { id: 1, title: "Block A1", desc: "Down town, New Delhi, India" },
        { id: 2, title: "Block A1-2nd", desc: "Down town, New Delhi, India" },
        { id: 3, title: "Block A2-1st", desc: "Down town, New Delhi, India" },
    ]

    useEffect(() => {
        const hasPermission = LocationPermission()
        if (hasPermission)
            Geolocation.getCurrentPosition(
                (position) => {
                    // console.log(position);
                    // setCoords((coords) => ({
                    //     ...coords,
                    //     latitude: position.coords.latitude, longitude: position.coords.longitude,
                    // }))
                },
                (error) => {
                    // console.log('');
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, showLocationDialog: true, distanceFilter: 0, forceLocationManager: false, forceRequestLocation: true }
            );
    }, [myLocation])

    // const onChangeCoords = (lat, lng) => {
    //     setCoords((coords) => ({
    //         ...coords,
    //         latitude: lat, longitude: lng,
    //     }))
    // }

    // map code end 

    return (
        <View style={{ flex: 1, height: '100%', paddingHorizontal: 6, backgroundColor: '#fff', }}>


            <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>




                <TouchableOpacity style={styles.cardWrapper} onPress={() => alert("selected")}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[styles.subHeading, { marginTop: 15 }]}>{selectedData.title}</Text>
                        <Text style={[styles.time, { marginTop: 15 }]}>{selectedData.time}</Text>
                    </View>
                    <Text style={styles.category}>{selectedData.category}</Text>
                    <View style={styles.location}>
                        <MaterialIcons name="location-on" size={28} />
                        <Text style={styles.locationTxt}>{selectedData.location}</Text>
                    </View>
                    <View style={styles.credits} >
                        <MaterialIcons name="credit-card" size={26} />
                        <Text style={styles.creditsTxt}>{selectedData.credits}</Text>
                    </View>



                </TouchableOpacity>
                <View >
                    <Text>Details</Text>


                    <View style={styles.Details}>
                        <View style={styles.rowAlign}>
                            <View style={styles.detailsContainer}>
                                <Text style={[styles.Question, {}]}> {selectedData.questions.question1}</Text>
                                <Text style={[styles.Answer, {}]}> {selectedData.answers.answer1}</Text>
                            </View>
                            <View style={styles.detailsContainer}>
                                <Text style={[styles.Question, {}]}> {selectedData.questions.question2}</Text>
                                <Text style={[styles.Answer, {}]}> {selectedData.answers.answer2}</Text>
                            </View>
                            <View style={styles.detailsContainer}>
                                <Text style={[styles.Question, {}]}> {selectedData.questions.question3}</Text>
                                <Text style={[styles.Answer, {}]}> {selectedData.answers.answer3}</Text>
                            </View>
                            <View style={styles.detailsContainer}>
                                <Text style={[styles.Question, {}]}> {selectedData.questions.question4}</Text>
                                <Text style={[styles.Answer, {}]}> {selectedData.answers.answer4}</Text>
                            </View>
                            <View style={styles.detailsContainer}>
                                <Text style={[styles.Question, {}]}> {selectedData.questions.question5}</Text>
                                <Text style={[styles.Answer, {}]}> {selectedData.answers.answer5}</Text>
                            </View>
                        </View>

                    </View>
                </View>


                <View style={styles.container}>
                    {toast ? setTimeout(() => setToast(0), 1500) && <Toast heading={toast} /> : null}

                    <MapView
                        style={styles.map}
                        toolbarEnabled={false}
                        initialRegion={{
                            latitude: selectedData.latitude,
                            longitude: selectedData.longitude,
                            latitudeDelta: selectedData.latitudeDelta,
                            longitudeDelta: selectedData.longitudeDelta,
                        }}

                    // onPress={(e) => onChangeCoords(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)}
                    // onRegionChange={(coords) => setCoords(coords)}
                    // onRegionChangeComplete={(coords) => setCoords(coords)}
                    // onPoiClick={(e) => onChangeCoords(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)}
                    >
                        <Marker
                            coordinate={
                                {
                                    latitude: selectedData.latitude,
                                    longitude: selectedData.longitude,
                                    latitudeDelta: selectedData.latitudeDelta,
                                    longitudeDelta: selectedData.longitudeDelta,
                                }
                            }
                            title={'You are here.'}
                            description={'Order will be delivered to this location.'}>
                            <Ionicons name="pin-sharp" size={48} color='#000'></Ionicons>
                        </Marker>
                        {/* // image={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFfyIMAcZxhHc_fL8Ofca_OlOn142g4cATtw&usqp=CAU' }}
                /> */}
                    </MapView>
                    <TouchableOpacity
                        style={[styles.onBoardButton, styles.skipBtn]}
                        onPress={() => {
                            setMyLocation(!myLocation)
                            setToast('Fetching Location !')
                        }}>
                        <MaterialIcons name="my-location" size={26} color={'#007bff'} style={{
                        }} ></MaterialIcons>
                    </TouchableOpacity>

                    <ScrollView style={styles.addressView} showsVerticalScrollIndicator={true}>
                        <Text style={styles.heading}>Confirm your delivery location</Text>
                        {addresses.map((item, index) =>
                            <View style={styles.rowAlign} key={index}>
                                <TouchableOpacity onPress={() => setSelected(item.id)}>
                                    <View style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center' }]}>
                                        <MaterialIcons name="location-pin" size={26} color={item.id === selected ? '#fc9918' : '#000'} style={{ marginRight: 10 }} ></MaterialIcons>
                                        <Text style={styles.subHeading}>{item.title}</Text>
                                    </View>
                                    <Text style={[styles.regTxt, { color: '#B8B7B7', marginLeft: 36, marginBottom: 10 }]}>
                                        {item.desc}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.confirmBtn]}
                                    onPress={() => {
                                        setSelected(item.id)
                                        navigation.navigate('Addresses')
                                    }}>
                                    <MaterialIcons name="arrow-forward" size={16} color={'#fff'} style={{
                                    }} ></MaterialIcons>
                                </TouchableOpacity>
                            </View>
                        )}
                    </ScrollView>

                </View >



            </ScrollView >
            <Button title={`Contact ${selectedData.title}`} onPress={() => { alert("Thnx For contacting") }} />



        </View >

    )
}


const Content = ({ navigation, route }) => {

    const { BaseUrl, appData, } = useContext(AuthContext)

    const activeColor = "#F5CF04"

    const [search, setSearch] = useState('')

    console.log('route', route)


    return (
        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}

        >



            {Data.map((item, index) =>
                <TouchableOpacity key={index} style={styles.cardWrapper} onPress={() => navigation.navigate(item.route)}>
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
            )}



        </ScrollView>

    )
}

export default DateLocker

const styles = StyleSheet.create({
    //     contentScroll: {
    //         display: 'flex',
    //         width: '100%',
    //         position: 'relative',
    //         paddingTop: 10,
    //     },
    //     filterWrapper: {
    //         flexDirection: 'row',
    //         justifyContent: 'flex-end',
    //         paddingRight: 20
    //     },
    //     filterTxt: {
    //         fontSize: 30,
    //         color: '#000',
    //         paddingLeft: 4,
    //         fontFamily: 'Roboto-Medium',
    //     },
    //     filtericon: {
    //         paddingTop: 4
    //     },

    //     category: {
    //         fontSize: 20,
    //         fontFamily: 'Roboto-Medium',
    //         color: '#000',
    //         fontSize: PixelRatio.getPixelSizeForLayoutSize(8),

    //     },

    //     subHeading: {
    //         fontSize: 24,
    //         fontSize: PixelRatio.getPixelSizeForLayoutSize(9),
    //         color: '#000',
    //         fontFamily: "Roboto-Medium",
    //     },
    //     cardWrapper: {
    //         alignSelf: "center",
    //         display: 'flex',
    //         padding: 10,
    //         width: '99%',
    //         marginBottom: 5,
    //         backgroundColor: '#fff',
    //         borderBottomWidth: 1,
    //         borderColor: '#ECECEC',
    //     },
    //     location: {
    //         display: 'flex',
    //         flexDirection: 'row',
    //         width: '100%',
    //         paddingVertical: 6
    //     },

    //     locationTxt: {
    //         fontSize: 18,
    //     }
    //     ,
    //     credits: {
    //         paddingVertical: 4,
    //         flexDirection: 'row',
    //         marginLeft: 4
    //     }
    //     ,
    //     creditsTxt: {
    //         fontSize: 18
    //     }


    // })



    contentScroll: {
        display: 'flex',
        // width: '100%',
        position: 'relative',

        paddingHorizontal: 10
    },


    category: {
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        color: '#000',
        // fontSize: PixelRatio.getPixelSizeForLayoutSize(8),

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
        // marginHorizontal: 30,

    },
    location: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 6,

    },

    locationTxt: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(6),
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
    time: {
        color: '#a9a9a9'
    },
    Question: {
        // width: '100%',
        paddingHorizontal: 10,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(7),
        fontFamily: 'Roboto-Medium',
        color: "#a9a9a9",
        margin: 2,
        marginLeft: 3,
    },
    Answer: {
        // width: "100%",
        fontSize: PixelRatio.getPixelSizeForLayoutSize(7),
        fontWeight: '600',
        color: '#000000',
        paddingHorizontal: 10
    },
    detailsContainer: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderRadius: 8,
        borderColor: '#ECECEC',
        marginVertical: 10,
        justifyContent: 'space-between',
        alignSelf: 'auto',
        width: ' 100%',
        // lineHeight: 4,
        // height: 70
        paddingVertical: 20

    },
    Details: {
        display: 'flex',
        width: '100%',
        // position: 'relative',


    },
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '',
        height: 500,
        width: '100%'
    },
    map: {
        width: '100%',
        height: '40%',

    },
    onBoardButton: {
        // position: 'absolute',
        bottom: '12%',
        right: 15,
        alignSelf: 'flex-end',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        color: "#fff",
        borderRadius: 50,
        width: 50,
        height: 50,
        backgroundColor: "transparent"
    },
    skipBtn: {
        width: 50,
        backgroundColor: '#fff',
        borderRadius: 50,
        marginLeft: 10,

        borderWidth: 1,
        borderColor: '#f7f7f7',
        elevation: 3,
        shadowColor: '#666',
        // for ios below 
        shadowOffset: { width: 5, height: 5 }
    },


})
