import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from '../components/Loading';
import SignInScreen from '../screens/LoginScreen';
import passwordScreen from '../screens/passwordScreen';
import DashboardScreen from '../screens/DashboardScreen';
import information_userScreen from '../screens/information_userScreen'
import { getToken } from '../api/authEndpoints/authService';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); 

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await getToken();
      setIsAuthenticated(!!token);
      setIsLoading(false); 
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return <LoadingScreen />; 
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="password" component={passwordScreen} />
          <Stack.Screen name="information_user" component={information_userScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});