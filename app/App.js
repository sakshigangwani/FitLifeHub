import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';

//Screen Imports
import SplashScreenComponent from './screens/SplashScreenComponent';
import Data from './screens/Data';
import Login from './screens/Login';
import Name from './screens/Name';
import Location from './screens/Location';
import Gender from './screens/Gender';
import Coach from './screens/Coach';
import Age from './screens/Age';
import Active from './screens/Active';
import Tall from './screens/Tall';
import Weight from './screens/Weight';
import Fast from './screens/Fast';
import Target from './screens/Target';
import { UserProvider } from './context/UserContext';
import Home from './screens/Home';
import Gym from './screens/Gym';
import BottomNavigation from './components/BottomNavigation';
import Calculator from './screens/Calculator';
import Account from './screens/Account';
import DietMeal from './screens/DietMeal';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>  {/* Wrap the whole navigation stack inside UserProvider */}
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Splash' component={SplashScreenComponent} />
            <Stack.Screen name='Data' component={Data} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Name' component={Name} />
            <Stack.Screen name='Location' component={Location} />
            <Stack.Screen name='Gender' component={Gender} />
            <Stack.Screen name='Coach' component={Coach} />
            <Stack.Screen name='Age' component={Age} />
            <Stack.Screen name='Active' component={Active} />
            <Stack.Screen name='Tall' component={Tall} />
            <Stack.Screen name='Weight' component={Weight} />
            <Stack.Screen name='Fast' component={Fast} />
            <Stack.Screen name='Target' component={Target} />
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Gym' component={Gym} />
            <Stack.Screen name='Calculator' component={Calculator} />
            <Stack.Screen name='Account' component={Account} />
            <Stack.Screen name='DietMeal' component={DietMeal} />
            <Stack.Screen name='BottomNavigation' component={BottomNavigation} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider> {/* Close the UserProvider here */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
