import React from 'react';
import { ActivityIndicator, View, StyleSheet, SafeAreaView, Text, StatusBar } from 'react-native';
import { useThemeColors } from '../utils/colors';

export default function LoadingScreen() {
  const color:any=useThemeColors;
  return (
     <SafeAreaView style={[styles.container, { backgroundColor: color().background }]}>
           <View style={styles.loadingContainer}>
             <ActivityIndicator size="large" color={color().primary} />
           </View>
         </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});