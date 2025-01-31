import { useRef, useState, useEffect } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { Animated, View, StyleSheet } from "react-native";
import { useUser } from '../context/UserContext'; // Import the custom hook

const Target = ({ navigation, route }) => {
    const { height, weight, setHeight, setWeight } = useUser();
    const progressAnim = useRef(new Animated.Value(0)).current; // Start with width 0
    const [progressBarWidth, setProgressBarWidth] = useState(0); // Stores the full width of the progress bar
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [selectedTarget, setSelectedTarget] = useState("");

    useEffect(() => {
        if (progressBarWidth > 0) {
            Animated.timing(progressAnim, {
                toValue: progressBarWidth * 0.9,
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
        navigation.navigate("Fast");
    }

    const calculateBMI = () => {
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        return bmi.toFixed(2);
    }

    const calculateIdealWeightRange = () => {
        const heightInMeters = height / 100; // Convert height to meters
        const minWeight = 18.5 * heightInMeters * heightInMeters; // Minimum ideal weight
        const maxWeight = 24.9 * heightInMeters * heightInMeters; // Maximum ideal weight
        return { minWeight: minWeight.toFixed(1), maxWeight: maxWeight.toFixed(1) };
    };

    const calculateTargetWeight = () => {
        const { minWeight, maxWeight } = calculateIdealWeightRange();
        const targetWeight = (parseFloat(minWeight) + parseFloat(maxWeight)) / 2; // Average of min and max weight
        return targetWeight.toFixed(1); // Return rounded to 1 decimal place
    };

    const bmi = calculateBMI();
    const { minWeight, maxWeight } = calculateIdealWeightRange();
    const targetWeight = calculateTargetWeight();
    const isTargetWeightInvalid = selectedTarget && (parseFloat(selectedTarget) < parseFloat(minWeight) || parseFloat(selectedTarget) > parseFloat(maxWeight));

    return (
        <View style={styles.ageContainer}>
            <View
                style={styles.progressBar}
                onLayout={(event) => setProgressBarWidth(event.nativeEvent.layout.width)}
            >
                <Animated.View style={[styles.progress, { width: progressAnim }]} />
            </View>
            <Animated.View style={[styles.greetingsContainer, { opacity: fadeAnim }]}>
                <Text style={styles.greetingsText}>What's your target weight?</Text>
                <Text style={styles.greetingsCaption}>
                    Set a realistic weight goal for yourself.
                </Text>
            </Animated.View>
            <View style={[styles.bmiBox, isTargetWeightInvalid && styles.bmiWarning]}>
                {isTargetWeightInvalid ? <Text style={styles.bmiWarningText}>Healthy range based on your BMI is {minWeight}-{maxWeight} kg. But, choose a goal that feels right for you.</Text> : <Text style={styles.bmiInfo}>Based on your BMI of {bmi}, your Ideal Weight range is {minWeight}-{maxWeight} kg</Text>}
            </View>
            <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
                <TextInput
                    style={styles.input}
                    placeholder={`Your target weight is ${targetWeight}`}
                    keyboardType="default"
                    onChangeText={(text) => setSelectedTarget(text)}
                    value={selectedTarget}
                />
                <Text style={styles.yearsText}>Kg</Text>
            </Animated.View>
            <View style={styles.nextBtnContainer}>
                <TouchableOpacity style={styles.nextBtn} onPress={nextPressHandle}>
                    <Text style={styles.nextBtnText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Target;

const styles = StyleSheet.create({
    ageContainer: {
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
    },
    bmiBox: {
        backgroundColor: "#fff",
        marginTop: 30,
        width: "67%",
        alignItems: "center",
        paddingVertical: 20,
        borderRadius: 8,
        backgroundColor: "#E82561",
    },
    bmiInfo: {
        textAlign: "center",
        fontSize: 14,
        color: "#fff",
        paddingHorizontal: 20
    },
    bmiWarning: {
        backgroundColor: "#F2AE66", // Red background when weight is invalid
    },
    bmiWarningText: {
        textAlign: "center",
        fontSize: 14,
        color: "#000000",
        paddingHorizontal: 20
    },
})
