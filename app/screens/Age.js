import { useRef, useState, useEffect } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { Animated, View, StyleSheet } from "react-native";

const Age = ({navigation}) => {
    const progressAnim = useRef(new Animated.Value(0)).current; // Start with width 0
    const [progressBarWidth, setProgressBarWidth] = useState(0); // Stores the full width of the progress bar
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [selectedAge, setSelectedAge] = useState("20");

    useEffect(() => {
        if (progressBarWidth > 0) {
            Animated.timing(progressAnim, {
                toValue: progressBarWidth * 0.5,
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
        navigation.navigate("Active");
    }

    return (
        <View style={styles.ageContainer}>
            <View
                style={styles.progressBar}
                onLayout={(event) => setProgressBarWidth(event.nativeEvent.layout.width)}
            >
                <Animated.View style={[styles.progress, { width: progressAnim }]} />
            </View>
            <Animated.View style={[styles.greetingsContainer, { opacity: fadeAnim }]}>
                <Text style={styles.greetingsText}>What's your Age?</Text>
                <Text style={styles.greetingsCaption}>
                    Your age determines how much you should consume. (Select your age in years)
                </Text>
            </Animated.View>
            <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
                <TextInput
                    style={styles.input}
                    placeholder={selectedAge}
                    keyboardType="phone-pad"
                />
                <Text style={styles.yearsText}>Years</Text>
            </Animated.View>
            <View style={styles.nextBtnContainer}>
                <TouchableOpacity style={styles.nextBtn} onPress={nextPressHandle}>
                    <Text style={styles.nextBtnText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Age;

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
        top: 30,
        left: 300,
        color: "#E0E0E0",
        fontWeight: "bold"
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
