import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "../screens/Home";
import Calculator from "../screens/Calculator";
import Account from "../screens/Account";
import Blogs from "../screens/Blogs";

const Tab = createMaterialBottomTabNavigator();

function BottomNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#000"
            inactiveColor="#000"
            barStyle={{ backgroundColor: "#EBE7D9", borderTopColor: "#eeeeee", borderTopWidth: 1, }}
            shifting={false}
        >
            <Tab.Screen
                name="Blogs"
                component={Blogs}
                options={{
                    tabBarLabel: 'Blogs',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="newspaper" color={color} size={28} />
                    ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={28} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={28} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomNavigation;