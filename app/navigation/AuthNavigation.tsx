import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DashboardScreen from '../screens/DashboardScreen'
import newgardens from "../screens/newgardens";
import NotificationScreen from "../screens/NotificationScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import updatePassword from "../screens/updatePassword";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import setting from "../screens/setting";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        <Stack.Screen name="newgardens" component={newgardens} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="updatePassword" component={updatePassword} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="SettingsScreen" component={setting} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      
      </Stack.Navigator>
    
  );
};

export default AuthNavigator;
