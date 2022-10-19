import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, PixelRatio, TextInput, Image, ScrollView, ImageBackground, Dimensions } from 'react-native'

import { AuthContext } from '../../navigation/AuthProvider'
import BaseScreen from '../../components/BaseScreen'



const themeColor = '#F5CF04'



const Term_privacyScreen = ({ navigation }) => {
    return (
        <BaseScreen
            title={"Term & Condition"}
            renderChild={Content({ navigation })} navigation={navigation} paddingTop={false}
        />
    )
}


const Content = ({ navigation }) => {

    const { BaseUrl, appData, } = useContext(AuthContext)

    const activeColor = "#F5CF04"

    const [search, setSearch] = useState('')

    return (
        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>

<Text style={styles.heading}>
Terms and Conditions 
</Text>



        </ScrollView>

    )
}

export default Term_privacyScreen

const styles = StyleSheet.create({
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
        position: 'relative',
        paddingTop: 10,
        color: '#000000'
    },
    heading:{
        fontSize: 30
    }
})