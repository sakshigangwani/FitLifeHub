import { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Animated, View, Text, TextInput, FlatList, ScrollView, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RadioButton } from 'react-native-paper';

const cities = [
    { name: "Bengaluru", icon: "apartment" },
    { name: "Mumbai", icon: "location-city" },
    { name: "New Delhi", icon: "business" },
    { name: "Dubai", icon: "flight" },
    { name: "Chicago", icon: "location-on" },
    { name: "Los Angeles", icon: "public" },
    { name: "New York", icon: "place" },
    { name: "Toronto", icon: "apartment" },
    { name: "Kuala Lumpur", icon: "location-city" },
    { name: "Singapore", icon: "public" },
    { name: "Jakarta", icon: "location-on" },
    { name: "San Francisco", icon: "business" },
];

const Location = ({navigation}) => {
    const progressAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(800)).current;
    const popupAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [progressBarWidth, setProgressBarWidth] = useState(0);
    const [selectedCity, setSelectedCity] = useState("");
    const [citySelected, setCitySelected] = useState(false);
    const [checked, setChecked] = useState('English');

    useEffect(() => {
        if (progressBarWidth > 0) {
            Animated.timing(progressAnim, {
                toValue: progressBarWidth * 0.2,
                duration: 1000,
                useNativeDriver: false
            }).start();
        }

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();

        Animated.sequence([
            Animated.timing(popupAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();
        
        if (citySelected) {
            // Start the animation when a city is selected
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }).start();
        }
    }, [progressBarWidth, popupAnim, slideAnim, fadeAnim, citySelected]);

    function handleCitySelect(cityname) {
        setSelectedCity(cityname);
        setCitySelected(true);
    }

    function nextBtnHandle() {
        navigation.navigate("Gender");
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.scrollContainer}>
                {/* Progress Bar */}
                <View
                    style={styles.progressBar}
                    onLayout={(event) => setProgressBarWidth(event.nativeEvent.layout.width)}
                >
                    <Animated.View style={[styles.progress, { width: progressAnim }]} />
                </View>

                {/* Question Section */}
                <Animated.View style={[styles.questionContainer, { opacity: fadeAnim }]}>
                    <Text style={styles.questionHeading}>Where are you from?</Text>
                    <Text style={styles.questionCaption}>This will help us personalize the app for you</Text>
                </Animated.View>

                {/* Search Input */}
                <Animated.View style={[styles.textInputContainer, { opacity: fadeAnim }]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search for your city"
                        keyboardType="default"
                        value={selectedCity}
                    />
                    <Icon name="search" size={25} color="#000000" style={styles.icon} />
                </Animated.View>

                {/* City List */}
                {citySelected === false ? (<Animated.View style={[styles.listContainer, {
                    transform: [
                        {
                            scale: popupAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                            }),
                        },
                    ],
                }]}>
                    <FlatList
                        data={cities}
                        keyExtractor={(item) => item.name}
                        numColumns={3}
                        contentContainerStyle={styles.gridContainer}
                        renderItem={({ item }) => (
                            <View style={styles.cityContainer} onTouchEnd={() => handleCitySelect(item.name)}>
                                <Icon name={item.icon} size={30} color="#fff" />
                                <Text style={styles.cityName}>{item.name}</Text>
                            </View>
                        )}
                    />
                </Animated.View>) : (
                <Animated.View style={[styles.languageContainer,{
                    transform: [{
                        translateY: slideAnim, 
                    }],
                }]}
                >
                    <View>
                        <Text style={styles.languageHeading}>Which language do you prefer to speak in?</Text>
                        <Text style={styles.languageCaption}>This does not affect your app language</Text>
                        <View style={styles.radioButtonContainer}>
                            <View style={styles.radioButtonItem}>
                                <RadioButton
                                    value="English"
                                    status={checked === 'English' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('English')}
                                    uncheckedColor="#000000"
                                    color="#E82561"
                                />
                                <Text style={styles.radioButtonLabel}>English</Text>
                            </View>
                            <View style={styles.radioButtonItem}>
                                <RadioButton
                                    value="Hindi"
                                    status={checked === 'Hindi' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('Hindi')}
                                    uncheckedColor="#000000"
                                    color="#E82561"
                                />
                                <Text style={styles.radioButtonLabel}>Hindi (हिन्दी)</Text>
                            </View>
                        </View>
                        <View style={styles.radioButtonContainer}>
                            <View style={styles.radioButtonItem}>
                                <RadioButton
                                    value="Tamil"
                                    status={checked === 'Tamil' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('Tamil')}
                                    uncheckedColor="#000000"
                                    color="#E82561"
                                />
                                <Text style={styles.radioButtonLabel}>Tamil(தமிழ்)</Text>
                            </View>
                            <View style={styles.radioButtonItem}>
                                <RadioButton
                                    value="Telugu"
                                    status={checked === 'Telugu' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('Telugu')}
                                    uncheckedColor="#000000"
                                    color="#E82561"
                                />
                                <Text style={styles.radioButtonLabel}>Telugu (తెలుగు)</Text>
                            </View>
                        </View>
                        <View style={styles.radioButtonContainer}>
                            <View style={styles.radioButtonItem}>
                                <RadioButton
                                    value="Kannada"
                                    status={checked === 'Kannada' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('Kannada')}
                                    uncheckedColor="#000000"
                                    color="#E82561"
                                />
                                <Text style={styles.radioButtonLabel}>Kannada (ಕನ್ನಡ)</Text>
                            </View>
                            <View style={styles.radioButtonItem}>
                                <RadioButton
                                    value="Malayalam"
                                    status={checked === 'Malayalam' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('Malayalam')}
                                    uncheckedColor="#000000"
                                    color="#E82561"
                                />
                                <Text style={styles.radioButtonLabel}>Malayalam (മലയാളം)</Text>
                            </View>
                        </View>
                        <View style={styles.radioButtonContainer}>
                            <View style={styles.radioButtonItem}>
                                <RadioButton
                                    value="Gujarati"
                                    status={checked === 'Gujarati' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('Gujarati')}
                                    uncheckedColor="#000000"
                                    color="#E82561"
                                />
                                <Text style={styles.radioButtonLabel}>Gujarati (ગુજરાતી)</Text>
                            </View>
                            <View style={styles.radioButtonItem}>
                                <RadioButton
                                    value="Bengali"
                                    status={checked === 'Bengali' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('Bengali')}
                                    uncheckedColor="#000000"
                                    color="#E82561"
                                />
                                <Text style={styles.radioButtonLabel}>Bengali (বাংলা)</Text>
                            </View>
                        </View>
                        <View style={styles.radioButtonContainer}>
                            <View style={styles.radioButtonItem}>
                                <RadioButton
                                    value="Marathi"
                                    status={checked === 'Marathi' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('Marathi')}
                                    uncheckedColor="#000000"
                                    color="#E82561"
                                />
                                <Text style={styles.radioButtonLabel}>Marathi (मराठी)</Text>
                            </View>
                            <View style={styles.radioButtonItem}>
                                <RadioButton
                                    value="Other"
                                    status={checked === 'Other' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('Other')}
                                    uncheckedColor="#000000"
                                    color="#E82561"
                                />
                                <Text style={styles.radioButtonLabel}>Other</Text>
                            </View>
                            <View style={styles.nextBtnContainer}>
                                <TouchableOpacity style={styles.nextBtn} onPress={nextBtnHandle}>
                                    <Text style={styles.nextBtnText}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Animated.View>)}
            </View>
        </KeyboardAvoidingView>
    );
}

export default Location;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0F222D",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingBottom: 100,
        paddingTop: 120,
    },
    progressBar: {
        width: "55%",
        backgroundColor: "#E0E0E0",
        height: 5,
        borderRadius: 10,
    },
    progress: {
        backgroundColor: "#E82561",
        height: 5,
        borderRadius: 10,
    },
    questionContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
    },
    questionHeading: {
        fontSize: 30,
        fontWeight: "600",
        marginBottom: 15,
        color: "#EBE7D9",
    },
    questionCaption: {
        fontSize: 15,
        textAlign: "center",
        marginHorizontal: 20,
        color: "#EBE7D9",
    },
    textInputContainer: {
        flexDirection: "row",
    },
    input: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginTop: 15,
        width: 360,
    },
    icon: {
        position: "absolute",
        right: 20,
        bottom: 12,
    },
    listContainer: {
        marginTop: 20,
        paddingHorizontal: 10,
        width: "100%",
    },
    cityContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        margin: 8,
        borderRadius: 10,
        backgroundColor: "#1F3C4E",
        minWidth: 100,
        height: 130,
    },
    cityName: {
        color: "#fff",
        fontSize: 16,
        marginTop: 8,
        textAlign: "center",
    },
    languageContainer: {
        marginTop: 40
    },
    languageHeading: {
        fontSize: 30,
        fontWeight: "600",
        marginBottom: 15,
        color: "#EBE7D9",
        textAlign: "center",
        paddingHorizontal: 20
    },
    languageCaption: {
        fontSize: 15,
        fontWeight: "300",
        marginBottom: 25,
        color: "#EBE7D9",
        textAlign: "center",
        paddingHorizontal: 20
    },
    radioButtonContainer: {
        flexDirection: "row",
        gap: 10,
        marginTop: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        marginLeft: 35
    },
    radioButtonItem: {
        flexDirection: "row",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    nextBtnContainer: {
        position: "absolute",
        top: 125,
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
});
