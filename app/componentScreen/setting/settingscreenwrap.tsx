"use client"

import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView, Platform, Alert, StatusBar } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import LanguageOptions from './languge'
import ModeScreen from './modedarkligt'
import Autorization from './autoriasation'
import Lougout from './Lougout'
import Account from './profile'
import Header from './header'
import Headerpricipale from '../../components/headers'
import { useThemeColors } from "../../utils/colors"

import Layout from "../../screens/layout"
import { useLanguage } from "@/app/context/LanguageContext"
import { useTranslation } from "react-i18next"
import { getLanguage, getModeScreen } from "@/app/utils/serviceAutorisation"
import i18n from "@/app/utils/i18n"

const SettingsScreen: React.FC = () => {
 const { language } = useLanguage(); 
 const [mode, setMode] = useState<"light" | "dark">("light");
 useEffect(()=>{
  console.log("SettingsScreen:",language);
 },[language])
  const { t } = useTranslation();
  useEffect(()=>{
   console.log("SettingsScreen:",language);
  },[language])
   useEffect(() => {
     const fetchMode = async () => {
       const modeFromStorage:any = await getModeScreen();
       if (modeFromStorage && modeFromStorage !== mode) {
         setMode(modeFromStorage);
       }
     };
 
     fetchMode();
 
     const fetchLanguage = async () => {
       const lang = await getLanguage();
       if (lang && lang !== i18n.language) {
         i18n.changeLanguage(lang);
       }
     };
 
     fetchLanguage();
   }, []);
   const COLORS = useThemeColors(mode);
  return (
    <Layout>
    <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
      <Headerpricipale/>
      <View style={{height:60}}/>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={[styles.container, { backgroundColor: COLORS.background }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
<Header/>

        {/* Account Section */}
 <Account/>
        {/* Language Section */}
          
           <LanguageOptions />
       
     

        {/* Appearance Section */}
       <ModeScreen/>

        {/* Notifications Section */}
              <Autorization/>

        {/* Logout Button */}
                   <Lougout/>

        {/* Bottom padding */}
          <View style={styles.bottomPadding} />
      </ScrollView>

    </SafeAreaView>
    </Layout>
  )
}

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  bottomPadding: {
    height: 40,
  },
})

export default SettingsScreen

