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

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,  // Hide the header
        }}>
          <Stack.Screen name='Splash' component={SplashScreenComponent} options={{ headerShown: false }} />
          <Stack.Screen name='Data' component={Data} options={{ headerShown: false }} />
          <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
          <Stack.Screen name='Name' component={Name} options={{headerShown: false}}/>
          <Stack.Screen name='Location' component={Location} options={{headerShown: false}}/>
          <Stack.Screen name='Gender' component={Gender} options={{headerShown: false}}/>
          <Stack.Screen name='Coach' component={Coach} options={{headerShown: false}}/>
          <Stack.Screen name='Age' component={Age} options={{headerShown: false}}/>
          <Stack.Screen name='Active' component={Active} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
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
