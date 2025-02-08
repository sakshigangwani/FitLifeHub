import { useEffect, useRef, useState } from "react";
import { View, Animated, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Checkbox, Divider } from 'react-native-paper';

const Exclude = ({navigation}) => {
    const progressAnim = useRef(new Animated.Value(0)).current; // Start with width 0
    const [progressBarWidth, setProgressBarWidth] = useState(0);
    const [noneChecked, setNoneChecked] = useState(false);
    const [dairyChecked, setDairyChecked] = useState(false);
    const [glutenChecked, setGlutenChecked] = useState(false);
    const [lactoseChecked, setLactoseChecked] = useState(false);

    useEffect(() => {
        if (progressBarWidth > 0) {
            Animated.timing(progressAnim, {
                toValue: progressBarWidth * 0.6,
                duration: 1000,
                useNativeDriver: false
            }).start();
        }
    }, [progressBarWidth]);

    function nextBtnHandle(){
        navigation.navigate("Cuisines");
    }

    return (
        <View style={styles.excludeContainer}>
            <View
                style={styles.progressBar}
                onLayout={(event) => setProgressBarWidth(event.nativeEvent.layout.width)}
            >
                <Animated.View style={[styles.progress, { width: progressAnim }]} />
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.heading}>Do you have any ...</Text>
                <Text style={styles.caption}>Your diet plan will exclude these foods.</Text>
            </View>
            <View style={styles.noneContainer}>
                <Text style={styles.label}>None</Text>
                <View style={styles.checkButtonContainer}>
                    <View style={styles.checkboxButtonItem}>
                        <Checkbox
                            status={noneChecked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setNoneChecked(!noneChecked);
                            }}
                        />
                        <Text style={styles.radioButtonLabel}>None</Text>
                    </View>
                </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.foodAllergiesContainer}>
                <Text style={styles.label}>Food Allergies</Text>
                <View style={styles.checkButtonContainer}>
                    <View style={styles.checkboxButtonItem}>
                        <Checkbox
                            status={dairyChecked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setDairyChecked(!dairyChecked);
                            }}
                        />
                        <Text style={styles.radioButtonLabel}>Dairy</Text>
                    </View>
                    <View style={styles.checkboxButtonItem}>
                        <Checkbox
                            status={glutenChecked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setGlutenChecked(!glutenChecked);
                            }}
                        />
                        <Text style={styles.radioButtonLabel}>Gluten</Text>
                    </View>
                    <View style={styles.checkboxButtonItem}>
                        <Checkbox
                            status={lactoseChecked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setLactoseChecked(!lactoseChecked);
                            }}
                        />
                        <Text style={styles.radioButtonLabel}>Lactose</Text>
                    </View>
                </View>
            </View>
            <View style={styles.nextBtnContainer}>
                <TouchableOpacity style={styles.nextBtn} onPress={nextBtnHandle}>
                    <Text style={styles.nextBtnText}>Next</Text>
                </TouchableOpacity>
            </View>
            {(dairyChecked || glutenChecked || lactoseChecked) ? <View style={styles.setChangeContainer}>
                <Divider style={styles.divider2} />
                <Text style={styles.notice}>Your diet plan will not have -</Text>
                <View style={styles.elements}>
                    {dairyChecked && <Text style={styles.noticeEl}>Dairy</Text>}
                    {glutenChecked && <Text style={styles.noticeEl}>Gluten</Text>}
                    {lactoseChecked && <Text style={styles.noticeEl}>Lactose</Text>}
                </View>
            </View>
                : null}
        </View>
    )
}

export default Exclude;

const styles = StyleSheet.create({
    excludeContainer: {
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
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25
    },
    heading: {
        fontSize: 22,
        fontWeight: "600",
        color: "#0F222D"
    },
    caption: {
        marginTop: 10,
        fontWeight: "500",
        color: "#0F222D",
    },
    noneContainer: {
        marginTop: 40,
        justifyContent: "flex-start",
        marginRight: 230
    },
    label: {
        fontSize: 20,
        fontWeight: "500"
    },
    checkboxButtonItem: {
        flexDirection: "row",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EBE7D9",
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    checkButtonContainer: {
        flexDirection: "row",
        gap: 10,
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    divider: {
        height: 2,
        backgroundColor: "#0F222D",
        marginTop: 12,
        width: "100%",
        opacity: 0.2
    },
    foodAllergiesContainer: {
        marginTop: 20,
        justifyContent: "flex-start",
    },
    nextBtnContainer: {
        position: "absolute",
        bottom: 60,
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
    setChangeContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    divider2: {
        height: 2,
        backgroundColor: "#0F222D",
        marginTop: 20,
        width: "100%",
        opacity: 0.2
    },
    notice: {
        marginTop: 18,
        fontSize: 14
    },
    noticeEl: {
        marginTop: 10,
        fontSize: 18,
        color: "red",
        fontWeight: "600"
    },
    elements: {
        flexDirection: "row",
        gap: 10
    }
})