import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Animated, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

const DietaryPref = () => {
    const progressAnim = useRef(new Animated.Value(0)).current; // Start with width 0
    const [progressBarWidth, setProgressBarWidth] = useState(0); // Stores the full width of the progress ba
    const [selectedElement, setSelectedElement] = useState("");

    useEffect(() => {
        if (progressBarWidth > 0) {
            Animated.timing(progressAnim, {
                toValue: progressBarWidth * 0.3,
                duration: 1000,
                useNativeDriver: false
            }).start();
        }
    }, [progressBarWidth]);

    function selectElement() {
        setSelectedElement("nonveg");
    }

    return (
        <View style={styles.dietPrefContainer}>
            <View
                style={styles.progressBar}
                onLayout={(event) => setProgressBarWidth(event.nativeEvent.layout.width)}
            >
                <Animated.View style={[styles.progress, { width: progressAnim }]} />
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>What is Your Dietary Preference?</Text>
                <Text style={styles.headerCaption}>Your diet will include foods based on this.</Text>
            </View>
            <View>
                <TouchableOpacity style={[selectedElement === "nonveg" ? styles.selectedElement : styles.threebtns]} onPress={selectElement}>
                    <Icon name="drumstick-bite" size={26} color={selectedElement === "nonveg" ? "#fff" : "#E82561"} />
                    <View style={styles.info}>
                        <Text style={styles.headerText}>Non Vegetarian</Text>
                        <Text style={styles.caption}>Chicken, Red Meat, Fish, Prawns etc</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[selectedElement === "veg" ? styles.selectedElement : styles.threebtns]} onPress={() => setSelectedElement("veg")}>
                    <Icon name="carrot" size={26} color={selectedElement === "veg" ? "#fff" : "#E82561"} />
                    <View style={styles.info}>
                        <Text style={styles.headerText}>Vegetarian</Text>
                        <Text style={styles.caption}>Vegetarian - no egg as well</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[selectedElement === "egg" ? styles.selectedElement : styles.threebtns]} onPress={() => setSelectedElement("egg")}>
                    <Icon name="egg" size={26} color={selectedElement === "egg" ? "#fff" : "#E82561"} />
                    <View style={styles.info}>
                        <Text style={styles.headerText}>Eggetarian</Text>
                        <Text style={styles.caption}>Vegetarian with egg dishes</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.nextBtnContainer}>
                    <TouchableOpacity style={styles.nextBtn}>
                        <Text style={styles.nextBtnText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default DietaryPref;

const styles = StyleSheet.create({
    dietPrefContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
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
    headerContainer: {
        marginTop: 30
    },
    header: {
        fontSize: 22,
        fontWeight: "500",
        color: "#0F222D",
        textAlign: "center"
    },
    headerCaption: {
        marginTop: 15,
        textAlign: "center",
        fontWeight: "500",
        color: "#0F222D",
    },
    threebtns: {
        backgroundColor: "#0F222D",
        marginTop: 20,
        flexDirection: "row",
        gap: 10,
        padding: 20,
        alignItems: "center",
        borderRadius: 10
    },
    selectedElement: {
        backgroundColor: "#E82561",
        marginTop: 20,
        flexDirection: "row",
        gap: 10,
        padding: 20,
        alignItems: "center",
        borderRadius: 10,
    },
    headerText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600"
    },
    caption: {
        color: "#fff",
        fontSize: 16,
    },
    info: {
        flexDirection: "column",
        gap: 6
    },
    nextBtnContainer: {
        position: "absolute",
        top: 420,
        alignSelf: "center",
    },
    nextBtn: {
        backgroundColor: "#0F222D",
        paddingHorizontal: 150,
        paddingVertical: 20,
        borderRadius: 10
    },
    nextBtnText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff"
    }
})