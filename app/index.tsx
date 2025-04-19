"use client"

import React from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { View } from "react-native"

// Import our app navigator
import AppNavigator from './navigation/AuthNavigation';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export default function App() {
 
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }} >
        <StatusBar style="auto" />
        <AppNavigator />
      </View>
    </SafeAreaProvider>
  )
}

