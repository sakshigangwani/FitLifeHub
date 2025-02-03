import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform, Animated } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useUser } from '../context/UserContext'; 

const Name = ({navigation}) => {
    const { name, setName } = useUser(); 
    const progressAnim = useRef(new Animated.Value(0)).current; // Start with width 0
    const [progressBarWidth, setProgressBarWidth] = useState(0); // Stores the full width of the progress bar
    const fadeAnim = useRef(new Animated.Value(0)).current;  
    const [selectedName, setSelectedName] = useState(name || " ");

    useEffect(() => {
        if (progressBarWidth > 0) {
            Animated.timing(progressAnim, {
                toValue: progressBarWidth * 0.1, 
                duration: 1000, 
                useNativeDriver: false
            }).start();
        }
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        ]).start();
    }, [progressBarWidth, fadeAnim]); 

    function nextPressHandle() {
        setName(selectedName);
        navigation.navigate("Location");
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View
                    style={styles.progressBar}
                    onLayout={(event) => setProgressBarWidth(event.nativeEvent.layout.width)} 
                >
                    <Animated.View style={[styles.progress, { width: progressAnim }]} />
                </View>
                <Animated.View style={[styles.greetingsContainer , { opacity: fadeAnim }]}>
                    <Text style={styles.greetingsText}>Hey there!</Text>
                    <Text style={styles.greetingsCaption}>
                        We're happy that you've taken the first step towards a healthier you.
                        We need a few details to kickstart your journey.
                    </Text>
                </Animated.View>
                <Animated.View style={[styles.formContainer , { opacity: fadeAnim }]}>
                    <Text style={styles.nameText}>What is your name?</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Your Name"
                        keyboardType="default"
                        onChangeText={(text) => setSelectedName(text)}
                    />
                </Animated.View>
                <Animated.View style={[styles.referralContainer, { opacity: fadeAnim }]}>
                    <Icon name="card-giftcard" size={25} color="#EBE7D9" />
                    <Text style={styles.referralText}>Have a referral code?</Text>
                </Animated.View>
            </ScrollView>
            <View style={styles.nextBtnContainer}>
                <TouchableOpacity style={styles.nextBtn} onPress={nextPressHandle}>
                    <Text style={styles.nextBtnText}>Next</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Name;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0F222D",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100, // Prevents button from overlapping content
    },
    progressBar: {
        width: "55%",
        backgroundColor: '#E0E0E0',
        height: 5,
        borderRadius: 10
    },
    progress: {
        backgroundColor: '#E82561',
        height: 5,
        borderRadius: 10
    },
    greetingsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    },
    greetingsText: {
        fontSize: 30,
        fontWeight: "600",
        marginBottom: 20,
        color: "#EBE7D9"
    },
    greetingsCaption: {
        fontSize: 15,
        textAlign: "center",
        marginHorizontal: 24,
        color: "#EBE7D9"
    },
    nameText: {
        fontSize: 30,
        marginTop: 50,
        fontWeight: "600",
        color: "#EBE7D9",
        textAlign: "center"
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginTop: 15,
        width: 360
    },
    referralContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginTop: 20
    },
    referralText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#EBE7D9",
        textAlign: "center"
    },
    nextBtnContainer: {
        position: "absolute",
        bottom: 60,
        alignSelf: "center",
    },
    nextBtn: {
        backgroundColor: "#E8F9FF",
        paddingHorizontal: 150,
        paddingVertical: 20,
        borderRadius: 10
    },
    nextBtnText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#0F222D"
    }
});
