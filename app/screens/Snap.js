import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get("window");

const Snap = () => {
    return (
        <View style={styles.snapContainer}>
            <Text style={styles.heading}>Track Food</Text>
            <Image source={require('../assets/images/camera.png')} style={styles.img}/>
            <View style={styles.cameraContainer}>
                <Icon name="camera" size={30} color="white" />
                <Text style={styles.cameraText}>Snap or Add from Gallery</Text>
            </View>
            <View style={styles.searchBar}>
                <Icon name="search" size={20} color="#fff" />
                <Text style={styles.text}>Search and Track</Text>
            </View>
        </View>
    )
}

export default Snap;

const styles = StyleSheet.create({
    snapContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#0F222D",
    },
    cameraContainer: {
        marginTop: 20,
        backgroundColor: "black",
        padding: 90,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    cameraText: {
        color: "#fff",
        fontSize: 16
    },
    searchBar: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        gap: 10,
        backgroundColor: "#0F222D",
        paddingRight: 90,
        paddingVertical: 20,
        paddingLeft: 40,
        borderRadius: 10
    },
    text: {
        color: "#fff",
        fontSize: 16
    },
    img: {
        width: width * 0.5,  // 50% of screen width
        height: width * 0.5, // Keeping it square
        marginTop: 20
    },
})