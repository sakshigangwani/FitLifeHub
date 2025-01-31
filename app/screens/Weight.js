import { useRef, useState, useEffect } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { Animated, View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useUser } from '../context/UserContext'; 

const Weight = ({navigation}) => {
    const { weight, setWeight } = useUser(); 
    const progressAnim = useRef(new Animated.Value(0)).current; // Start with width 0
    const [progressBarWidth, setProgressBarWidth] = useState(0); // Stores the full width of the progress bar
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [selectedBox, setSelectedBox] = useState("");
    const [selectedWeight, setSelectedWeight] = useState(weight || "46.0");

    useEffect(() => {
        if (progressBarWidth > 0) {
            Animated.timing(progressAnim, {
                toValue: progressBarWidth * 0.8,
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

    function nextBtn() {
        setWeight(selectedWeight);
        navigation.navigate("Target");
    }

    return (
        <View style={styles.weightContainer}>
            <View
                style={styles.progressBar}
                onLayout={(event) => setProgressBarWidth(event.nativeEvent.layout.width)}
            >
                <Animated.View style={[styles.progress, { width: progressAnim }]} />
            </View>
            <Animated.View style={[styles.greetingsContainer, { opacity: fadeAnim }]}>
                <Text style={styles.greetingsText}>What is your current weight?</Text>
                <Text style={styles.greetingsCaption}>
                    This will help us determine your goal, and monitor your progress over time
                </Text>
            </Animated.View>
            <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
                <TextInput
                    style={styles.input}
                    placeholder={selectedWeight}
                    keyboardType="default"
                    onChangeText={(text) => setSelectedWeight(text)}
                    value={selectedWeight}
                />
                <Text style={styles.yearsText}>Kg</Text>
            </Animated.View>
            <View style={styles.nextBtnContainer}>
                <TouchableOpacity style={styles.nextBtn} onPress={nextBtn}>
                    <Text style={styles.nextBtnText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Weight;

const styles = StyleSheet.create({
    weightContainer: {
        flex: 1,
        backgroundColor: "#0F222D",
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 27,
        fontWeight: "600",
        marginBottom: 16,
        color: "#EBE7D9"
    },
    greetingsCaption: {
        fontSize: 14,
        textAlign: "center",
        marginHorizontal: 24,
        color: "#EBE7D9"
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginTop: 15,
        width: 360,
    },
    yearsText: {
        position: "absolute",
        top: 27,
        left: 310,
        color: "#E0E0E0",
        fontWeight: "bold",
        fontSize: 18
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
})