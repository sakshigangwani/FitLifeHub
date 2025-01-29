import { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Text, Animated, useAnimatedValue } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); 

const SplashScreenComponent = () => {
    const navigation = useNavigation();
    const animation = useRef(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;  
    const popupAnim = useRef(new Animated.Value(0)).current; 

    useEffect(() => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(popupAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();

        setTimeout(() => {
            navigation.replace('Login');  
          }, 3000); 
          SplashScreen.hideAsync();
    }, [fadeAnim, popupAnim, navigation]);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: 450,
                    height: 450,
                    backgroundColor: '#fff',
                }}
                source={require('../assets/images/logo.json')}
            />
            <Animated.View
                style={[
                    styles.headingContainer,
                    {
                        transform: [
                            {
                                scale: popupAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1], 
                                }),
                            },
                        ],
                    },
                ]}>
                <Text style={styles.heading}>FitLifeHub</Text>
                <Text style={styles.headingCaption}>Glow Up Your Health Game!</Text>
            </Animated.View>
        </Animated.View>
    )
}

export default SplashScreenComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    headingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    heading: {
        fontSize: 50,
        color: '#0F222D',
        fontWeight: 'bold'
    },
    headingCaption: {
        fontSize: 16,
        color: '#191970',
        fontWeight: '700'
    }
})