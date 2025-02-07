import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-paper';

//Screen width
const { width } = Dimensions.get("window");

const DietMeal = ({navigation}) => {
    function onPressPlus() {
        navigation.navigate("Snap");
    }

    function onPressDietPlan()
    {
        navigation.navigate("DietPref");
    }
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled">
            <View style={styles.dietMealContainer}>
                <Text style={styles.heading}>Today</Text>
                <Image source={require('../assets/images/women.png')} style={styles.img} />
                <View style={styles.threeBtns}>
                    <TouchableOpacity style={styles.button} onPress={onPressDietPlan}>
                        <Icon name="apple" size={20} color="white" />
                        <Text style={styles.buttonText}>Diet Plan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Icon name="book" size={20} color="white" />
                        <Text style={styles.buttonText}>Recipes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Icon name="heart" size={20} color="white" />
                        <Text style={styles.buttonText}>Saved Meals</Text>
                    </TouchableOpacity>
                </View>
                <Divider style={styles.divider} />
                <View style={styles.breakfastContainer}>
                    <View style={styles.breakfastHeading}>
                        <Text style={styles.breakfastHeadingText}>Breakfast</Text>
                        <View style={styles.breakfastCalorie}>
                            <Text style={styles.breakfastCalorieText}>0 of 512 Cal</Text>
                            <Icon name="plus-circle" size={20} color="#E82561" onPress={onPressPlus}/>
                        </View>
                    </View>
                    <View style={styles.breakfastBox}>
                        <View style={styles.box}>
                            <Text style={styles.boxText}>All you need is some breakfast 🍳🥞☕!</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.breakfastContainer}>
                    <View style={styles.breakfastHeading}>
                        <Text style={styles.breakfastHeadingText}>Morning Snack</Text>
                        <View style={styles.breakfastCalorie}>
                            <Text style={styles.breakfastCalorieText}>0 of 256 Cal</Text>
                            <Icon name="plus-circle" size={20} color="#E82561" onPress={onPressPlus}/>
                        </View>
                    </View>
                    <View style={styles.breakfastBox}>
                        <View style={styles.box}>
                            <Text style={styles.boxText}>Get energized by grabbing a morning snack 🍎!</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.breakfastContainer}>
                    <View style={styles.breakfastHeading}>
                        <Text style={styles.breakfastHeadingText}>Lunch</Text>
                        <View style={styles.breakfastCalorie}>
                            <Text style={styles.breakfastCalorieText}>0 of 512 Cal</Text>
                            <Icon name="plus-circle" size={20} color="#E82561" onPress={onPressPlus}/>
                        </View>
                    </View>
                    <View style={styles.breakfastBox}>
                        <View style={styles.box}>
                            <Text style={styles.boxText}>Don't miss lunch 🍛🥗🍽️!</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.breakfastContainer}>
                    <View style={styles.breakfastHeading}>
                        <Text style={styles.breakfastHeadingText}>Evening Snack</Text>
                        <View style={styles.breakfastCalorie}>
                            <Text style={styles.breakfastCalorieText}>0 of 256 Cal</Text>
                            <Icon name="plus-circle" size={20} color="#E82561" onPress={onPressPlus}/>
                        </View>
                    </View>
                    <View style={styles.breakfastBox}>
                        <View style={styles.box}>
                            <Text style={styles.boxText}>Recharge with a tasty evening snack ☕🍪🍿!</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.breakfastContainer}>
                    <View style={styles.breakfastHeading}>
                        <Text style={styles.breakfastHeadingText}>Dinner</Text>
                        <View style={styles.breakfastCalorie}>
                            <Text style={styles.breakfastCalorieText}>0 of 512 Cal</Text>
                            <Icon name="plus-circle" size={20} color="#E82561" onPress={onPressPlus}/>
                        </View>
                    </View>
                    <View style={styles.breakfastBox}>
                        <View style={styles.box}>
                            <Text style={styles.boxText}>End your day with a hearty dinner 🍽️🥘🥂!</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default DietMeal;

const styles = StyleSheet.create({
    dietMealContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100, // Prevents button from overlapping content
        paddingBottom: 50,
        backgroundColor: "#fff"
    },
    img: {
        width: width * 0.5,  // 50% of screen width
        height: width * 0.5, // Keeping it square
    },
    threeBtns: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: width * 0.87 // 87% of screen width
    },
    button: {
        backgroundColor: "#E82561",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        padding: 8,
        borderRadius: 8
    },
    buttonText: {
        color: "#fff",
        fontWeight: "400"
    },
    heading: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#0F222D",
        marginBottom: 10
    },
    breakfastContainer: {
        flexDirection: "column",
        marginTop: 20
    },
    breakfastHeading: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: width * 0.85 // 85% of screen width
    },
    breakfastCalorie: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 6
    },
    box: {
        backgroundColor: "#0F222D",
        height: width * 0.18,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
        borderRadius: 10
    },
    boxText: {
        color: "#fff",
        fontSize: 13

    },
    breakfastHeadingText: {
        fontSize: 15,
        fontWeight: 500,
    },
    breakfastCalorieText: {
        fontSize: 15,
        fontWeight: 500
    },
    divider: {
        width: width * 0.7,
        backgroundColor: "#0F222D",
        height: 2,
        marginTop: 20
    }
})