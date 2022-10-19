import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, PixelRatio, TextInput, Image, ScrollView, ImageBackground, Dimensions } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import { AuthContext } from '../../navigation/AuthProvider'
import BaseScreen from '../../components/BaseScreen'
import Input from '../../components/Input'
import Button from '../../components/Button'
import moment from 'moment/moment';
import FilterDetails from '../../Data.js/Details'


const themeColor = '#F5CF04'



const Filter = ({ navigation }) => {
    return (
        <BaseScreen
            title={'Filter'}
            renderChild={Content({ navigation })} navigation={navigation} paddingTop={false}
        />
    )
}


const Content = ({ navigation }) => {

    const { BaseUrl, appData, } = useContext(AuthContext)

    const activeColor = "#F5CF04"

    const [search, setSearch] = useState('')
    const [isSelected, setIsSelected] = useState(false)

    return (
        <View style={styles.contentScroll}>
        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}       >
            
            
                
            {FilterDetails.map((item, index) =>
                <View key={index} style={styles.cardWrapper}>
                    <View style={styles.checkboxContainer}>
                    <TouchableOpacity style={styles.checkbox} onPress={() => setIsSelected(!isSelected)}>
                        {isSelected ?
                            <MaterialIcons name='check' color="#6495ed" size={20}></MaterialIcons>
                            : null
                        }
                    </TouchableOpacity>
                   
                    <Text style={styles.regTxt}>{item.title} </Text>
                   
                </View>
                </View>
            )}
            
            
        </ScrollView>
        <Button title={"Apply Filter"} />
        </View>
    )
}

export default Filter

const styles = StyleSheet.create({
    contentScroll: {
        display: 'flex',
        height: '100%',
        width: '100%',
        position: 'relative',
        paddingTop: 10,
    },
    rowAlign: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    
    checkboxContainer: {
        flexDirection: "row", 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        marginLeft: 10,
        borderWidth:1,
        borderColor:'#fff',
        marginVertical: 6

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
    regTxt:{
        fontSize: 18,
        color:"#000000"
    }
})