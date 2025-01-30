import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Animated, Text, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DATA = [
    { id: "1", title: "Coach Guidance", icon: "person" },
    { id: "2", title: "SNAP", icon: "camera" },
    { id: "3", title: "Diet Plan", icon: "local-dining" },
    { id: "4", title: "Weight Loss", icon: "fitness-center" },
    { id: "5", title: "Intermittent Fasting", icon: "timer" },
    { id: "6", title: "Calorie Tracker", icon: "calculate" },
    { id: "7", title: "Workouts and Yoga", icon: "sports-gymnastics" },

]

const Coach = () => {
    const [progressBarWidth, setProgressBarWidth] = useState(0); // Stores the full width of the progress bar
    const progressAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [checked, setChecked] = useState(false);
    const [selectedItem, setSelectedItems] = useState([]);
    const [checkedBox, setCheckedBox] = useState("");

    useEffect(() => {
        if (progressBarWidth > 0) {
            Animated.timing(progressAnim, {
                toValue: progressBarWidth * 0.4,
                duration: 1000,
                useNativeDriver: false
            }).start();
        }
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    }, [progressBarWidth, fadeAnim]);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.item, selectedItem.includes(item.id) && styles.selectedItem]} onPress={() => toggleSelection(item.id)} >
                <Icon name={item.icon} size={24} color={selectedItem.includes(item.id) ? "#fff" : "#000000"} style={styles.icon} />
                <Text style={[styles.text, selectedItem.includes(item.id) && styles.selectedText]}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    const toggleSelection = (itemId) => {
        setSelectedItems(prevState => {
            if(prevState.includes(itemId)){
                return prevState.filter(id => id!==itemId)
            }else{
                return [...prevState, itemId];
            }
        })
    }

    return (
        <View style={styles.coachContainer}>
            <View
                style={styles.progressBar}
                onLayout={(event) => setProgressBarWidth(event.nativeEvent.layout.width)}
            >
                <Animated.View style={[styles.progress, { width: progressAnim }]} />
            </View>
            <Animated.View style={[styles.greetingsContainer, { opacity: fadeAnim }]}>
                <Text style={styles.greetingsText}>What are you looking for?</Text>
                <Text style={styles.greetingsCaption}>
                    Selecting one or more options would help us tailor your experience.
                </Text>
            </Animated.View>
            <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
                <FlatList
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            </Animated.View>
            <View style={styles.nextBtnContainer}>
                <TouchableOpacity style={styles.nextBtn}>
                    <Text style={styles.nextBtnText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Coach;

const styles = StyleSheet.create({
    coachContainer: {
        flex: 1,
        backgroundColor: "#0F222D",
        justifyContent: 'center',
        alignItems: 'center',
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
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 100,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 35,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        gap: 10,
        width: "100%",
        paddingRight: 130
    },
    nextBtnContainer: {
        position: "absolute",
        bottom: 50,
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
    selectedItem: {
        backgroundColor: "#E82561",
    },
    selectedText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    }
});