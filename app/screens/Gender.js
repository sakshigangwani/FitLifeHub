import { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Animated, StyleSheet, Text, Touchable } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const Gender = () => {
    const [progressBarWidth, setProgressBarWidth] = useState(0); // Stores the full width of the progress bar
    const progressAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [selectedBox, setSelectedBox] = useState("");

    useEffect(() => {
        if (progressBarWidth > 0) {
            Animated.timing(progressAnim, {
                toValue: progressBarWidth * 0.3,
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

    function handleGridSelect(gender){
        setSelectedBox(gender);
    }

    return (
        <View style={styles.genderContainer}>
            <View
                style={styles.progressBar}
                onLayout={(event) => setProgressBarWidth(event.nativeEvent.layout.width)}
            >
                <Animated.View style={[styles.progress, { width: progressAnim }]} />
            </View>
            <Animated.View style={[styles.greetingsContainer, { opacity: fadeAnim }]}>
                <Text style={styles.greetingsText}>What's your biological sex?</Text>
                <Text style={styles.greetingsCaption}>
                    We support all forms of gender expression. However, we need this to calculate your body metrics.
                </Text>
            </Animated.View>
            <Animated.View style={[styles.genderGrid, { opacity: fadeAnim }]}>
                <TouchableOpacity style={[styles.maleBtn, selectedBox === "Male" && styles.selectedBtn]} onPress={() => handleGridSelect("Male")}>
                    <Icon name="male" size={50} color={selectedBox === "Male" ? "#fff" : "#000000"} />
                    <Text style={[styles.genderText, selectedBox === "Male" && styles.selectedText]}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.femaleBtn, selectedBox === "Female" && styles.selectedBtn]} onPress={() => handleGridSelect("Female")}>
                    <Icon name="female" size={50} color={selectedBox === "Female" ? "#fff" : "#000000"} />
                    <Text style={[styles.genderText, selectedBox === "Female" && styles.selectedText]}>Female</Text>
                </TouchableOpacity>
            </Animated.View>
            <View style={styles.nextBtnContainer}>
                <TouchableOpacity style={styles.nextBtn} >
                    <Text style={styles.nextBtnText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Gender;

const styles = StyleSheet.create({
    genderContainer: {
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
    genderGrid: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
        marginTop: 20
    },
    maleBtn: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 40,
        paddingVertical: 30,
        borderRadius: 10
    },
    femaleBtn: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 40,
        paddingVertical: 30,
        borderRadius: 10
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
    selectedBtn: {
        backgroundColor: "#E82561",
    },
    selectedText: {
        color: "#fff"
    }
})