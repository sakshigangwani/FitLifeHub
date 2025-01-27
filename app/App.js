import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';

import SplashScreenComponent from './screens/SplashScreenComponent';
import Data from './screens/Data';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,  // Hide the header
          gestureEnabled: true, // Enable swipe gesture
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, // Custom transition from bottom to top
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
        }}>
          <Stack.Screen name='Splash' component={SplashScreenComponent} options={{ headerShown: false }} />
          <Stack.Screen name='Data' component={Data} options={{ headerShown: false }} />
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
