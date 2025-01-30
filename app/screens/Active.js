import { useRef, useState, useEffect } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { Animated, View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const Active = ({navigation}) => {
    const progressAnim = useRef(new Animated.Value(0)).current; // Start with width 0
    const [progressBarWidth, setProgressBarWidth] = useState(0); // Stores the full width of the progress bar
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [selectedBox, setSelectedBox] = useState("");

    useEffect(() => {
        if (progressBarWidth > 0) {
            Animated.timing(progressAnim, {
                toValue: progressBarWidth * 0.6,
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

    function handleBox(event) {
        setSelectedBox(event);
    }

    return (
        <View style={styles.activeContainer}>
            <View
                style={styles.progressBar}
                onLayout={(event) => setProgressBarWidth(event.nativeEvent.layout.width)}
            >
                <Animated.View style={[styles.progress, { width: progressAnim }]} />
            </View>
            <Animated.View style={[styles.greetingsContainer, { opacity: fadeAnim }]}>
                <Text style={styles.greetingsText}>How active are you?</Text>
                <Text style={styles.greetingsCaption}>
                    Based on your lifestyle, we can assess your daily calorie requirements.
                </Text>
            </Animated.View>
            <Animated.View style={[styles.activeButtons, { opacity: fadeAnim }]}>
                <TouchableOpacity style={[styles.activeBtn, selectedBox === "chair" && styles.selectedBox]} onPress={() => handleBox('chair')}>
                    <Icon name="chair" size={24} color="#0F222D" />
                    <View style={styles.activeText}>
                        <Text style={[styles.heading, selectedBox === "chair" && styles.selectedHeading]}>Mostly Sitting</Text>
                        <Text style={selectedBox === "chair" && styles.selectedCaption}>Seated work, low movement</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.activeBtn, selectedBox === "person" && styles.selectedBox]} onPress={() => handleBox('person')}>
                    <Icon name="person" size={24} color="#0F222D" />
                    <View style={styles.activeText}>
                        <Text style={[styles.heading, selectedBox === "person" && styles.selectedHeading]}>Often Standing</Text>
                        <Text style={selectedBox === "person" && styles.selectedCaption}>Standing work, occasional walking</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.activeBtn, selectedBox === "walk" && styles.selectedBox]} onPress={() => handleBox('walk')}>
                    <Icon name="directions-walk" size={24} color="#0F222D" />
                    <View style={styles.activeText}>
                        <Text style={[styles.heading, selectedBox === "walk" && styles.selectedHeading]}>Regularly Walking</Text>
                        <Text style={selectedBox === "walk" && styles.selectedCaption}>Frequent walking, steady activity</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.activeBtn, selectedBox === "work" && styles.selectedBox]} onPress={() => handleBox('work')}>
                    <Icon name="sports-gymnastics" size={24} color="#0F222D" />
                    <View style={styles.activeText}>
                        <Text style={[styles.heading, selectedBox === "work" && styles.selectedHeading]}>Physically Intense Work</Text>
                        <Text style={selectedBox === "work" && styles.selectedCaption}>Heavy labor, high exertion</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
            <View style={styles.nextBtnContainer}>
                <TouchableOpacity style={styles.nextBtn} onPress={nextPressHandle}>
                    <Text style={styles.nextBtnText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Active;

const styles = StyleSheet.create({
    activeContainer: {
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
    activeButtons: {
        flexDirection: "column",
        alignItems: 'center',
        marginTop: 20,
        width: "100%",
    },
    activeBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        gap: 10,
        width: "90%",
        paddingRight: 80
    },
    activeText: {
        flexDirection: "column",
        gap: 6
    },
    heading: {
        fontWeight: "600"
    },
    selectedBox: {
        backgroundColor:"#E82561"
    },
    selectedHeading: {
        color: "#fff",
        fontSize: 18
    },
    selectedCaption: {
        color: "#fff",
    }
})