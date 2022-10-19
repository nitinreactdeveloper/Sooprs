import React, { useState, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, Platform, PixelRatio, View, TextInput, ScrollView, Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import Octicons from 'react-native-vector-icons/dist/Octicons'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { AuthContext } from '../../navigation/AuthProvider'
import BaseScreen from '../../components/BaseScreen'

const errorColor =
    '#fe0000'

const darkBlue = '#2C467B'

const Leads = ({ navigation }) => {

    return (
        <BaseScreen title={'Sign up'} navigation={navigation} renderChild={Content({ navigation })} leftButton={true} />
    )
}

const Content = ({ navigation }) => {
    const { login, fetching, setFetching } = useContext(AuthContext)

    const [distance, setDistance] = useState()
    const [locaion, setLocation] = useState()






    return (
        <View style={{ width: '100%', flex: 1 }}>
            <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>

                <Text style={[styles.heading, { marginBottom: 20, textAlign: 'center' }]}>
                    Where would you like to see lead from?</Text>

                <Text style={[styles.subHeading, { marginBottom: 5 }]}>Tell us the area you cover so we show you leads for your location</Text>

                <View style={styles.inputcontainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 8 }}>
                        <Octicons name="circle" size={26} />
                        <Text style={{ marginHorizontal: 10, fontSize: 18, color: '#a9a9a9' }}>I service costumers within</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Input
                            borderColor={'#000'}
                            width={200}
                            name="distance" value={distance} placeholder='50 miles'
                            onChangeText={(text) => {
                                setDistance(text)
                            }}
                        >
                        </Input>
                        <Text style={{
                            fontSize: 30,
                            marginRight: 40,
                            color: '#000',
                            fontFamily: 'Roboto-Medium'
                        }}>from</Text>
                    </View>
                    <Input
                        borderColor={'#000'}

                        name="locaion" value={locaion} placeholder='Enter your Locaton'
                        onChangeText={(text) => {
                            setLocation(text)
                        }}
                    >
                    </Input>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 8 }}>
                        <Octicons name="circle" size={26} />
                        <Text style={{ marginHorizontal: 10, fontSize: 18, color: '#a9a9a9' }}>Nationwide</Text>
                    </View>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 8 }}>
                    <MaterialIcons name="error-outline" size={26} color={"#a9a9a9"} />
                    <Text style={{ marginHorizontal: 10, fontSize: 18, color: '#a9a9a9' }}>You can Change your location at any time</Text>
                </View>
            </ScrollView>

            <Button title={'Next'} 
            onPress={()=>{navigation.navigate('Register')}}/>
           </View>
    )
}


export default Leads;

const styles = StyleSheet.create({
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
    },
    heading: {
        fontSize: 30,
        color: '#000',
        fontFamily: "Roboto-Bold",
        marginBottom: 5,
    },
    subHeadingBold: {
        fontSize: 16,
        color: '#000',
        fontFamily: "Roboto-SemiBold",

    },
    subHeading: {
        fontSize: 20,
        color: '#000',
        fontFamily: "Roboto-Medium",
        textAlign: 'center'
    },
    smTxt: {
        fontSize: 12,
        color: '#000',
        fontFamily: 'Roboto-Regular'
    },
    regTxt: {
        fontSize: 14,
        color: '#000',
        fontFamily: 'Roboto-Regular'
    },
    fontMedium: {
        fontFamily: 'Roboto-Medium'
    },
    rowAlign: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },


    checkboxContainer: {
        flexDirection: "row", justifyContent: 'center', alignItems: 'center',
        marginLeft: 10,
        // borderWidth:1,borderColor:'#fff'
    },
    checkbox: {
        alignSelf: "center",
        display: 'flex',
        justifyContent: 'center', alignItems: 'center',
        backgroundColor: '#fff',
        width: 25,
        height: 25,
        marginRight: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#6495ed'
    },

    forgotBtnWrapper: {
        // alignSelf: 'flex-end',
    },
    forgotBtn: {
        fontSize: 14,
        // color: '#fc9918'
        color: '#000',
        fontFamily: "Roboto-Medium",
    },

    orWrapper: {
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        marginVertical: 40,
    },
    orline: {
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        borderTopColor: '#aaa',
        borderTopWidth: 1,
        width: '30%',
    },
    orTxt: {
        // marginTop: -16.5,
        fontSize: 20, fontWeight: '600',
        backgroundColor: 'transparent',
        color: '#aaa',
        width: 50,
        textAlign: 'center'
    },

    whiteBtn: {
        backgroundColor: 'transparent',
        marginTop: 15,
        fontWeight: 500,
        color: "#fe0000",
        marginVertical: 25,
        width: '100%',
        alignItems: 'center'
    },
    fbButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 45,
        borderRadius: 6,
        backgroundColor: '#3228C5',
        marginBottom: 15,
    },
    socialButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', height: 55,
        // marginTop:45,
        borderRadius: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        elevation: 4,
        // for ios below 
        shadowOffset: { width: 5, height: 5 }
    },
    googleIcon: {
        width: 22, height: 22,
        marginRight: 20
    },
    socialBtnTxt: {
        fontSize: 16, fontWeight: '700',
        color: '#000'
    },
    inputcontainer: {
        marginVertical: 60
    }
})
