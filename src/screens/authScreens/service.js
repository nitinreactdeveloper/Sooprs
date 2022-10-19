import React, { useState, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, Platform, PixelRatio, View, TextInput, ScrollView, Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { AuthContext } from '../../navigation/AuthProvider'
import BaseScreen from '../../components/BaseScreen'

const errorColor =
    '#fe0000'

const darkBlue = '#2C467B'

const Services = ({ navigation }) => {

    return (
        <BaseScreen title={'Sign up'} navigation={navigation} renderChild={Content({ navigation })} leftButton={true} />
    )
}

const Content = ({ navigation }) => {
    const { login, fetching, setFetching } = useContext(AuthContext)

    const [services, setServices] = useState()





    return (
        <View style={{width: '100%', flex:1}}>
            <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>

                <Text style={[styles.heading, { marginBottom: 20, textAlign: 'center' }]}>what Services do you Provide?</Text>

                <Text style={[styles.subHeading, { marginBottom: 5 }]}>Add the service you provide most regularly, you can add more services later. </Text>

                <View style={styles.inputcontainer}>
                    <Input
                        borderColor={'#000'}
                        name="services" value={services} placeholder='Services'
                        onChangeText={(text) => {
                            setServices(text)
                        }}

                    >
                    </Input>
                </View>
            </ScrollView>
            <Button title={'Next'} 
            onPress={()=>{navigation.navigate('Leads')}}/>
        </View>
    )
}


export default Services;

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
        fontSize: 22,
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
