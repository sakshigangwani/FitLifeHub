import { useEffect, useRef, useState } from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { StyleSheet, View, Animated, Text } from "react-native";

const cuisines = [
    { id: "1", name: "North Indian", details: "Roti, Parantha, Sabjis, Rajma Chawal etc.", image: require("../../assets/images/northindian.jpg") },
    { id: "2", name: "South Indian", details: "Idly, Dosa, Lemon Rice, Upma etc.", image: require("../../assets/images/southindian.jpg") },
    { id: "3", name: "Continental", details: "Porridge, Breads, Pastas etc.", image: require("../../assets/images/continental.jpeg") },
    { id: "4", name: "Maharashtrian", details: "Pooran Poli, Usal etc.", image: require("../../assets/images/maharashtrian.jpg") },
    { id: "5", name: "Tamilian", details: "Rasam, Pongal, Poriyal etc.", image: require("../../assets/images/tamilian.jpg") },
]

const Cuisines = () => {
    const progressAnim = useRef(new Animated.Value(0)).current;
    const [progressBarWidth, setProgressBarWidth] = useState(0);
    const [selectedCuisines, setSelectedCuisines] = useState([]);

    const toggleSelection = (id) => {
        setSelectedCuisines((prev) => 
            prev.includes(id) ? prev.filter((item)=> item!==id) : [...prev, id]
        );
    };

    useEffect(() => {
        if (progressBarWidth > 0) {
            Animated.timing(progressAnim, {
                toValue: progressBarWidth * 1,
                duration: 1000,
                useNativeDriver: false
            }).start();
        }
    }, [progressBarWidth]);

    return (
        <View style={styles.cuisinesContainer}>
            <View
                style={styles.progressBar}
                onLayout={(event) => setProgressBarWidth(event.nativeEvent.layout.width)}
            >
                <Animated.View style={[styles.progress, { width: progressAnim }]} />
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Which cuisines should we include in your diet?</Text>
            </View>
            <FlatList
                data={cuisines}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.cuisineBox, selectedCuisines.includes(item.id) && styles.selectedBox]} onPress={() => toggleSelection(item.id)}>
                        <Image source={item.image} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text style={styles.cuisineName}>{item.name}</Text>
                            <Text style={styles.details}>{item.details}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <View style={styles.nextBtnContainer}>
                <TouchableOpacity style={styles.nextBtn}>
                    <Text style={styles.nextBtnText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Cuisines;

const styles = StyleSheet.create({
    cuisinesContainer: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingTop: 100
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
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        marginBottom: 20
    },
    headerText: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: 500
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },
    cuisineBox: {
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: "#0F222D",
        padding: 15,
        borderRadius: 10
    },
    textContainer: {
        flexDirection: "column",
        gap: 6
    },
    cuisineName: {
        color: "#fff",
        fontSize: 16,
        fontWeight: 600
    },
    details: {
        color: "#fff"
    },
    nextBtnContainer: {
        position: "absolute",
        bottom: 50,
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
    },
    selectedBox: {
        backgroundColor: "#E82561"
    }
})