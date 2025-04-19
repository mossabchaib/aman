import React from "react";
import { View, StyleSheet } from "react-native";

import Tabbar from '../components/tabs';
import { LanguageProvider } from "../context/LanguageContext";


const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <LanguageProvider>
      <View style={styles.content}>
       {children}</View>
      <Tabbar />
      </LanguageProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1, // يجعل المحتوى يتمدد بين الهيدر والتاب بار
  },
});

export default Layout;
