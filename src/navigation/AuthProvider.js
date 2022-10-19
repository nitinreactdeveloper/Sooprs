import { View, Text } from 'react-native'
import React, { useState, useEffect, createContext, useReducer, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'react-native-axios';
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import messaging from '@react-native-firebase/messaging';
// import { getAppData } from '../screens/appScreens/AppData'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const BaseUrl = "https://shopninja.in/payment_app/api2/public/index.php"

    const [userToken, setUserToken] = useState(null)
    const [isFirstLaunch, setIsFirstLaunch] = useState(null)
    const [deviceId, setDeviceId] = useState(null)
    const [userDetails, setUserDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(false)
    const [initialRoute, setInitialRoute] = useState('Drawer')
    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState([]);

    const initialFetch = {
        loading: false,
        success: false,
        error: false,
        response: false
    }
    const fetchReducer = (state, action) => {
        switch (action.type) {
            case 'setLoading': return { ...state, loading: action.value }
            case 'setSuccess': return { ...state, success: action.value }
            case 'setError': return { ...state, error: action.value }
            case 'setResponse': return { ...state, response: action.value }
            case 'reset': return initialFetch
            default: return state
        }
    }
    const [fetching, setFetching] = useReducer(fetchReducer, initialFetch)

    const initialAppData = {
        patients: "",
    }
    const dataReducer = (state, action) => {
        switch (action.type) {
            case 'setPatients': return { ...state, patients: action.value }
            default: return state
        }
    }
    const [appData, setAppData] = useReducer(dataReducer, initialAppData)

    const getToken = async () => {
        await AsyncStorage.getItem('userToken').then(value => {
            if (value !== null) {
                setUserToken(value)

            }
        })
    }
    const getFcmToken = async () => {
        try {
            const token = await messaging().getToken();
            console.log('FCM token registered:', token);
            setDeviceId(token)
            console.log('FCM token length:', token.length);
        } catch (error) {
            console.error('Error getting FCM token:', error);
        }
    }
    const getIntialLaunch = () => {
        AsyncStorage.getItem('alreadyLaunched').then(value => {
            if (value == null) {
                AsyncStorage.setItem('alreadyLaunched', 'true');
                setIsFirstLaunch(true);
            }
        })
    }

    const getApiData = (id) => getAppData(id, setFetching, setAppData)

    useEffect(() => {
        getToken()
        // getFcmToken()
        getIntialLaunch()

        
    }, [])

    const getUser = async () => {
        console.log(userToken, 'userToken')
        setLoading(true)
        var data = new FormData();
        data.append('customer_id', userToken);
        await axios.post(BaseUrl + "/customer_details", data, {
            headers: { "Content-type": "multipart/form-data" }
        })
            .then((response) => {
                console.log(response.data, 'customer_details Api successful')
                setLoading(false)
                if (response.data !== null) {
                    setUserDetails(response.data.msg)
                }
            })
            .catch((error) => {
                setMessage('Network issue.')
                console.log(error, 'error while fetching customer_details api')
                setLoading(false)
            })
    }

    const handleAuthState = (user, navigation) => {
        if (user) {
            socialLoginApi(user.email, user.displayName, navigation)
            console.log(user, 'google user here')
        }
    }


    // Tagda raho codee
    const socialLoginApi = async (email, name, navigation) => {
        // navigation.navigate('SocialLogin')
        await axios.post(BaseUrl + "/customer_login",
            {
                user_name: name,
                email: email,
                device_id: deviceId,
                platform: 2
            })
            .then((response) => {
                console.log(response.data, 'customer_glogin Api successful')
                setLoading(false)
                if (response.data.status === 200) {
                    const verified = response.data.msg.is_verified
                    setUserDetails(response.data.msg)
                    if (verified === '2') {
                        setUserToken(response.data.msg.cust_id)
                        AsyncStorage.setItem('userToken', response.data.msg.cust_id)
                    }
                    else {
                        navigation.navigate('SocialLogin', { email: email, data: response.data.msg })
                    }
                }
                else {
                    setMessage(response.data.msg)
                }
            })
            .catch((error) => {
                console.log(error, 'error while fetching customer_glogin Api')
                setLoading(false)
            })
    }

    const sendOtp = async (mobile, navigation) => {
        setLoading(true)
        var form = new FormData()
        form.append('mob', mobile);
        await axios.post(BaseUrl + "/tr_send_otp", form, {
            headers: { "Content-type": "multipart/form-data" }
        })
            .then((response) => {
                setLoading(false)
                if (response.data.status == 200) {
                    navigation.navigate('Otp', { mobile: mobile })
                } else {
                    setMessage(response.data.msg)
                }
            })
            .catch((error) => {
                setLoading(false)
                console.log(error, 'error with api tr_send_otp')
            })
    }




// Tagde raho code end

    return (
        <AuthContext.Provider value={{
            userToken, fetching, setFetching, isFirstLaunch, setIsFirstLaunch, appData, setAppData, BaseUrl,
            skip: async ( ) => {
                await AsyncStorage.getItem('userToken').then(value => {
                    if (value !== null) {
                        setUserToken(value)
        
                    }
                })

            },
            login: async (email, password) => {
                console.log(email, password, 'username,password entered are')
                setLoading(true)
                var form = new FormData()
                form.append('email', email);
                // form.append('mobile', mobile);
                form.append('password', password);
                form.append('device_id', deviceId);
                await axios.post(BaseUrl + "/customer_login", form, {
                    headers: { "Content-type": "multipart/form-data" }
                })
                    .then((response) => {
                        console.log(response.data, 'customer_login Api successful')

                        setLoading(false)
                        if (response.data.status === 200) {
                            setUserToken(response.data.msg.cust_id)
                            AsyncStorage.setItem('userToken', response.data.msg.cust_id)
                            setUserDetails(response.data.msg)
                            
                        }
                        else if (response.data.status === 400) {
                            alert(response.data.msg)
                        }
                        else {
                            setMessage(response.data.msg)
                        }
                    })
                    .catch((error) => {
                        setMessage('Network issue.')
                        console.log(error, 'error while fetching Api')
                        setLoading(false)
                    })

            },

            register: async (name, email, mobile, password, navigation) => {
                console.log(email, password, 'username,password entered are')
                setLoading(true)
                var form = new FormData()
                form.append('name', name);
                form.append('email', email);
                form.append('mobile', mobile);
                form.append('password', password);
                form.append('device_id', deviceId);
                form.append('platform', '1');
                await axios.post(BaseUrl + "/customer_signup", form, {
                    headers: { "Content-type": "multipart/form-data" }
                })
                    .then((response) => {
                        console.log(response.data, 'customer_signup Api successful')
                        setLoading(false)
                        if (response.data.status === 200) {
                            // AsyncStorage.setItem('userToken', response.data.msg.cust_id)

                            setUserDetails(response.data.msg)

                        }
                        else {

                            setMessage(response.data.msg)
                        }
                    })
                    .catch((error) => {
                        setMessage('Network issue.')
                        console.log(error, 'error while fetching Api')
                        setLoading(false)
                    })
            },
            

            googleLogin: async ({ navigation }) => {
                try {
                    // Get the users ID token
                    setLoading(true)
                    const { idToken } = await GoogleSignin.signIn();

                    // Create a Google credential with the token
                    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                    // Sign-in the user with the credential
                    await auth().signInWithCredential(googleCredential);
                    const subscriber = auth().onAuthStateChanged((subscriber) => handleAuthState(subscriber, navigation));
                    setLoading(false)
                    setMessage('')
                }
                catch (e) {
                    setMessage(e.message)
                    console.log(e)
                    setLoading(false)
                }
            },



            logout: async () => {
                try {
                    setFetching({ type: 'setLoading', value: true })
                    await AsyncStorage.getItem('userToken').then((value) => console.log(value, 'is being logged out'))
                    await AsyncStorage.removeItem('userToken')
                    setUserToken(null)
                    setIsFirstLaunch(false)
                    setFetching({ type: 'setLoading', value: false })
                }
                catch (e) {
                    console.log(e)
                    setFetching({ type: 'setLoading', value: false })
                }
            },
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }

// generate new debug.keystore ---
    // keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
    // see sha1 key --
    // keytool -exportcert -keystore ./android/app/debug.keystore -list -v