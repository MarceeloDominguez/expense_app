import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import IndexAuthScreen from '../screens/IndexAuthScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import {useContextAuth} from '../context/AuthContext';
import Loading from '../components/Loading';
import {useGlobalAppContext} from '../context/GlobalAppContext';
import AccountScreen from '../screens/AccountScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarStyle: {elevation: 0},
        tabBarShowLabel: false,
        tabBarInactiveTintColor: '#ccc',
        tabBarActiveTintColor: '#5d60ce',
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => <Icon name="home" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="person" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const {state} = useContextAuth();
  const {appLoading} = useGlobalAppContext();

  if (appLoading) {
    return <Loading />;
  }

  return (
    <Stack.Navigator initialRouteName="IndexAuthScreen">
      {!state.isAuthenticated ? (
        <>
          <Stack.Screen
            name="IndexAuthScreen"
            component={IndexAuthScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default Navigation;
