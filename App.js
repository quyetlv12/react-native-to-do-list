import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Saved from './screens/saved';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Setting from './screens/setting';
import { HOME, SAVED, SETTING } from './configs';
const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
     <Tab.Navigator
     screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === HOME) {
          iconName = focused
            ? 'ios-home-sharp'
            : 'ios-home-outline';
        } else if (route.name === SAVED) {
          iconName = focused ? 'ios-save' : 'ios-save-outline';
        }else if(route.name === SETTING){
          iconName = focused ? 'ios-settings' : 'ios-settings-outline'
        }
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
     >
      <Tab.Screen name={HOME} component={Home} /> 
      <Tab.Screen name={SAVED} component={Saved}/>
      <Tab.Screen name={SETTING} component={Setting}/>
      {/* //options={{ tabBarBadge: 3 }} */}
    </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App