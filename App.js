import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme, withExpoSnack } from "nativewind";
import Toast from "react-native-toast-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DARK_COLOR, DARK_THEME, HOME, SAVED, SETTING } from "./configs";
import Home from "./screens/home";
import Saved from "./screens/saved";
import Setting from "./screens/setting";
import { DARK_MODE } from "nativewind/dist/utils/selector";
import CustomBar from "./components/customBar";

const Tab = createBottomTabNavigator();
const App = () => {
  const { colorScheme } = useColorScheme();
  return (
    <>
    {/* <CustomBar /> */}
      <NavigationContainer>
        <Tab.Navigator
          headerMode="screen"
          initialRouteName={HOME}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === HOME) {
                iconName = focused ? "ios-home-sharp" : "ios-home-outline";
              } else if (route.name === SAVED) {
                iconName = focused ? "ios-save" : "ios-save-outline";
              } else if (route.name === SETTING) {
                iconName = focused ? "ios-settings" : "ios-settings-outline";
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "orange",
            tabBarInactiveTintColor: "gray",
            headerStyle: [
              {
                backgroundColor:
                  colorScheme === DARK_THEME ? DARK_COLOR : "orange",
                  // color : colorScheme === DARK_THEME ? '#000' : '#000',
              },
            ],
            tabBarStyle: [
              {
                display: "flex",
                borderTopWidth: 0,
                backgroundColor: colorScheme === DARK_THEME ? DARK_COLOR : '#fff',
              },
              null,
            ],
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen name={HOME} component={Home} />
          <Tab.Screen name={SAVED} component={Saved} />
          <Tab.Screen name={SETTING} component={Setting} />
          {/* //options={{ tabBarBadge: 3 }} */}
        </Tab.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};
export default withExpoSnack(App);
