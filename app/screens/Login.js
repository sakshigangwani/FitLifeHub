import { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, Animated } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import Icon from 'react-native-vector-icons/MaterialIcons';

const Login = () => {
    const [countryCode, setCountryCode] = useState("+91");

    const countryCodes = [
        { label: "India (+91)", value: "India (+91)" },
        { label: "United States (+1)", value: "United States (+1)" },
        { label: "United Arab Emirates (+971)", value: "United Arab Emirates (+971)" },
        { label: "United Kingdom (+44)", value: "United Kingdom (+44)" },
        { label: "Australia (+61)", value: "Australia (+61)" },
    ];

    const popupAnim = useRef(new Animated.Value(0)).current; 
    const slideAnim = useRef(new Animated.Value(500)).current;

    useEffect(() => {
            Animated.sequence([
                Animated.timing(popupAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0, 
                    duration: 800,
                    useNativeDriver: true,
                })
            ]).start();
        }, [popupAnim, slideAnim]);
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Text style={styles.label}>Corporate User?</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.label}>Already a User?</Text>
                </TouchableOpacity>
            </View>
            <Animated.View style={[styles.logoContainer,{
                transform: [
                    {
                        scale: popupAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1], 
                        }),
                    },
                ],
            }]}>
                <Image source={require('../assets/images/logo_wix.png')} style={styles.img} />
            </Animated.View>
            <Animated.View style={[styles.loginContainer, {
                transform: [{
                    translateY: slideAnim, 
                }],
            }]}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Let's Create Your Account</Text>
                </View>
                <View style={styles.inputContainer}>
                    <SelectList
                        setSelected={(value) => setCountryCode(value)}
                        data={countryCodes}
                        save="value"
                        placeholder={countryCode}
                        boxStyles={styles.dropdown} // Custom styling
                        inputStyles={styles.inputText} // Style for text in the box
                        dropdownStyles={styles.dropdownMenu} // Dropdown menu styling
                        dropdownTextStyles={styles.dropdownText} // Style for menu items
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your phone number"
                        keyboardType="phone-pad"
                    />
                </View>
                <View style={styles.receiveUpdateContainer}>
                    <Text style={styles.receiveLabel}>Receive updates and reminders on Whatsapp</Text>
                </View>
                <View style={styles.continueContainer}>
                    <TouchableOpacity style={styles.continueBtn}>
                        <Text style={styles.continueText}>Continue</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.divider}>
                    <View style={styles.line} />
                    <Text style={styles.lineLabel}>or continue with</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.emailContainer}>
                    <TouchableOpacity style={styles.emailBtn}>
                        <Icon name="email" size={20} color="#0F222D" />
                        <Text style={styles.emailBtnText}>Email</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.threeBtns}>
                    <TouchableOpacity style={styles.btn}>
                        <Image source={require('../assets/images/apple.png')} style={styles.socialLogo} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Image source={require('../assets/images/google.png')} style={styles.socialLogo} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Image source={require('../assets/images/facebook.png')} style={styles.socialLogo} />
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>By signing up, I agree to the Terms of Service and Privacy Policy, including usage of Cookies</Text>
                </View>
            </Animated.View>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0F222D',
        paddingTop: 90
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%'
    },
    label: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16
    },
    logoContainer: {
        marginTop: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        height: 95,
        width: 180
    },
    loginContainer: {
        backgroundColor: '#EBE7D9',
        width: '100%',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 300,
        marginTop: 30
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35
    },
    titleText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2A3C47'
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: 8,
        marginTop: 6
    },
    input: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 15,
        borderRadius: 10
    },
    dropdown: {
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    dropdownMenu: {
        backgroundColor: "#0F222D",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#fff",
    },
    dropdownText: {
        fontSize: 14,
        color: "#fff",
        padding: 6,
    },
    receiveLabel: {
        textAlign: 'center',
        fontSize: 14,
        color: '#2A3C47'
    },
    continueContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    continueBtn: {
        backgroundColor: '#0F222D',
        paddingVertical: 20,
        paddingHorizontal: 40,
        width: '82%',
        borderRadius: 10
    },
    continueText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600'
    },
    divider: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 6
    },
    line: {
        backgroundColor: '#0F222D',
        height: 1,
        flex: 1
    },
    lineLabel: {
        color: '#0F222D'
    },
    emailContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emailBtn: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '82%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
        borderRadius: 10
    },
    emailBtnText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#0F222D'
    },
    threeBtns: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
    },
    socialLogo: {
        height: 30,
        width: 30
    },
    btn: {
        backgroundColor: '#fff',
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 10
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        marginTop: 160
    },
    footerText: {
        textAlign: 'center',
        fontSize: 12
    }
})