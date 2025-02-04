import { StyleSheet, Text, Touchable, TouchableOpacity, View, Animated } from "react-native";
import { useUser } from '../context/UserContext';
import { Avatar } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useRef } from "react";

const Home = ({navigation}) => {
    const popupAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const { name } = useUser();

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();

        Animated.sequence([
            Animated.timing(popupAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    }, [popupAnim, fadeAnim]);

    function dietMealPress() {
        navigation.navigate('DietMeal');
    }

    return (
        <View style={styles.homeContainer}>
            <Animated.View style={[styles.headerContainer, { opacity: fadeAnim }]}>
                <Text style={styles.headerText}>Hi, {name} ♡</Text>
                <Text style={styles.headerCaption}>Track. Train. Transform. 🚀</Text>
            </Animated.View>
            <Animated.View style={[styles.featuresContainer, { opacity: fadeAnim }]}>
                <Text style={styles.featureCaption}>Here’s what makes us your go-to fitness app:</Text>
            </Animated.View>
            <Animated.View style={[styles.featureBtnContainer, {
                transform: [
                    {
                        scale: popupAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                        }),
                    },
                ],
            }]}>
                <TouchableOpacity style={styles.featureBtn}>
                    <Text>🍎 Calorie Calculator </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.featureBtn} onPress={dietMealPress}>
                    <Text>🥗 Diet & meal planning</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.featureBtn}>
                    <Text>🚰 Water intake tracking</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.featureBtn}>
                    <Text>🛌 Sleep tracking & insights</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.featureBtn}>
                    <Text>🏋️‍♂️ Workout tracking & scheduling</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.featureBtn}>
                    <Text>📍 Find Gyms & Fitness Centers Nearby</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.featureBtn}>
                    <Text>🧘‍♂️ Guided meditation & mindfulness sessions</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0F222D",
    },
    headerContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    headerText: {
        fontSize: 35,
        color: "#EBE7D9",
        fontWeight: "600",
        textAlign: "center"
    },
    headerCaption: {
        fontSize: 16,
        color: "#EBE7D9",
        textAlign: "center",
        marginTop: 6,
        paddingHorizontal: 17
    },
    featuresContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25
    },
    featureCaption: {
        fontSize: 16,
        color: "#EBE7D9",
        textAlign: "justify",
        marginHorizontal: 25
    },
    featureBtnContainer: {
        marginTop: 20,
        flexDirection: "column",
        justifyContent: "center",
        gap: 8
    },
    featureBtn: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8
    }
})