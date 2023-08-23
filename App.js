import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Saved from './screens/saved';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
     <Tab.Navigator
     screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-home-sharp'
            : 'ios-home-outline';
        } else if (route.name === 'Saved') {
          iconName = focused ? 'ios-save' : 'ios-save-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
     >
      <Tab.Screen name="Home" component={Home} options={{ tabBarBadge: 3 }}/>
      <Tab.Screen name="Saved" component={Saved} options={{ tabBarBadge: 10 }}/>
    </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App