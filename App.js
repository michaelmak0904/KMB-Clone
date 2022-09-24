import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import FavouriteScreen from './screens/FavouriteScreen';
import {
  HomeIcon, StarIcon, SearchIcon, IdentificationIcon, ChatIcon
} from "react-native-heroicons/outline";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from './screens/ChatScreen';
import ClubScreen from './screens/ClubScreen';
import SearchScreen from './screens/SearchScreen';
import LeftMenu from './components/LeftMenu';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RouteScreen from './screens/RouteScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>No New Notifications!</Text>
      <Button
        onPress={() => navigation.goBack()}
        title="Go back home"
      />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider>
        <Tab.Navigator initialRouteName='Home' screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            switch (route.name) {
              case 'Home':
                return <HomeIcon name={iconName} size={size} color={color} />;
              case 'Favourite':
                return <StarIcon name={iconName} size={size} color={color} />;
              case 'Search':
                return <SearchIcon name={iconName} size={size} color={color} />;
              case 'Club':
                return <IdentificationIcon name={iconName} size={size} color={color} />;
              case 'Chat':
                return <ChatIcon name={iconName} size={size} color={color} />;
              default:
                return <HomeIcon name={iconName} size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'gray',
        })}>
          <Tab.Screen name="Home" component={HomeScreen} tabBarLabel="Home" />
          <Tab.Screen name="Favourite" component={FavouriteScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Club" component={ClubScreen} />
          <Tab.Screen name="Chat" component={ChatScreen} />
          <Tab.Screen name="Route" component={RouteScreen} />
        </Tab.Navigator>
      </TailwindProvider>
    </NavigationContainer >
  );
}