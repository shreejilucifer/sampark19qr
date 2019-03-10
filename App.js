import React from 'react';
import { Image } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, TabBarBottom, createAppContainer } from 'react-navigation';
import tabicon from './assets/tabicon.png';

// Auth Stack 
import AuthLoadingScreen from './src/Pages/AuthLoadingScreen';
import SignInScreen from './src/Pages/SignInScreen';

// Register Stack
import RegisterScreen from './src/Pages/RegisterScreen';

// Food Stack 
import FoodScreen from './src/Pages/FoodScreen';

// Networking Stack 
import NetworkScreen from './src/Pages/NetworkScreen';

const AuthStack = createStackNavigator({ 
    SignIn: SignInScreen, 
});

const RegisterStack = createBottomTabNavigator(
  {
    Register: RegisterScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: <Image source={tabicon} style={{marginBottom: '15%'}} />
    }),
    swipeEnabled: true,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        backgroundColor: '#15191c', 
        height: '10%'
      },
      showLabel: false,
      activeTintColor: '#f7931d',
      inactiveTintColor: '#fff',
    },
  }
);

const FoodStack = createBottomTabNavigator(
  {
    Food: FoodScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: <Image source={tabicon} style={{marginBottom: '15%'}} />
    }),
    swipeEnabled: true,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        backgroundColor: '#15191c', 
        height: '10%'
      },
      showLabel: false,
      activeTintColor: '#f7931d',
      inactiveTintColor: '#fff',
    },
  }
);

const NetworkingStack = createBottomTabNavigator(
  {
    Network: NetworkScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: <Image source={tabicon} style={{marginBottom: '15%'}} />
    }),
    swipeEnabled: true,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        backgroundColor: '#15191c', 
        height: '10%'
      },
      showLabel: false,
      activeTintColor: '#f7931d',
      inactiveTintColor: '#fff',
    },
  }
);

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    Register: RegisterStack, 
    Food: FoodStack, 
    Networking: NetworkingStack
  },
  {
    initialRouteName: 'AuthLoading',
  }
));