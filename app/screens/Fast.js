import { useRef, useState, useEffect } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { Animated, View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const Fast = ({navigation}) => {
    const progressAnim = useRef(new Animated.Value(0)).current; // Start with width 0
    const [progressBarWidth, setProgressBarWidth] = useState(0); // Stores the full width of the progress bar
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [selectedBox, setSelectedBox] = useState("");
    const [selectedCaption, setSelectedCaption] = useState("Relaxed");

    useEffect(() => {
        if (progressBarWidth > 0) {
            Animated.timing(progressAnim, {
                toValue: progressBarWidth * 1,
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
        navigation.navigate("BottomNavigation");
    }

    function handleBox(event) {
        setSelectedCaption(event);
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
                <Text style={styles.greetingsText}>How fast do you want to reach your goal?</Text>
                <Text style={styles.greetingsCaption}>
                    {selectedCaption === "Relaxed" && <Text>This is a good sustainable pace to reach your goal weight</Text>}
                    {selectedCaption === "Gradual" && <Text>This is a good pace, but you would need to work a bit harder</Text>}
                    {selectedCaption === "Steady" && <Text>At this pace, it can get tough, but with the right discipline, you can do it.</Text>}
                    {selectedCaption === "Rapid" && <Text>This pace will require extreme commitment!</Text>}

                </Text>
            </Animated.View>
            <Animated.View style={[styles.activeButtons, { opacity: fadeAnim }]}>
                <TouchableOpacity style={[styles.activeBtn, selectedCaption === "Relaxed" && styles.selectedBox]} onPress={() => handleBox('Relaxed')}>
                    <Icon name="spa" size={24} color="#0F222D" />
                    <View style={styles.activeText}>
                        <Text style={[styles.heading, selectedCaption === "Relaxed" && styles.selectedHeading]}>Relaxed</Text>
                        <Text style={selectedCaption === "Relaxed" && styles.selectedCaption}>0.25 kg per week</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.activeBtn, selectedCaption === "Gradual" && styles.selectedBox]} onPress={() => handleBox('Gradual')}>
                    <Icon name="directions-walk" size={24} color="#0F222D" />
                    <View style={styles.activeText}>
                        <Text style={[styles.heading, selectedCaption === "Gradual" && styles.selectedHeading]}>Gradual</Text>
                        <Text style={selectedCaption === "Gradual" && styles.selectedCaption}>0.5 kg per week</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.activeBtn, selectedCaption === "Steady" && styles.selectedBox]} onPress={() => handleBox('Steady')}>
                    <Icon name="accessibility" size={24} color="#0F222D" />
                    <View style={styles.activeText}>
                        <Text style={[styles.heading, selectedCaption === "Steady" && styles.selectedHeading]}>Steady</Text>
                        <Text style={selectedCaption === "Steady" && styles.selectedCaption}>0.75 kg per week</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.activeBtn, selectedCaption === "Rapid" && styles.selectedBox]} onPress={() => handleBox('Rapid')}>
                    <Icon name="rocket" size={24} color="#0F222D" />
                    <View style={styles.activeText}>
                        <Text style={[styles.heading, selectedCaption === "Rapid" && styles.selectedHeading]}>Rapid</Text>
                        <Text style={selectedCaption === "Rapid" && styles.selectedCaption}>1.0 kg per week</Text>
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

export default Fast;

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
        fontSize: 25,
        fontWeight: "600",
        marginBottom: 16,
        color: "#EBE7D9",
        textAlign: "center"
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