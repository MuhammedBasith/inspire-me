import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import QuoteScreen from './screens/QuoteScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3498db',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: '#f8f9fa',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'InspireMe',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Quote"
          component={QuoteScreen}
          options={{
            title: 'Daily Inspiration',
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            title: 'My Favorites',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
