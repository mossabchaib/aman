import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons'; 
import { useThemeColors } from '../utils/colors';
import { globalStyles } from '../utils/Fonts';
import { useTranslation } from 'react-i18next'; 
import { useLanguage } from '../context/LanguageContext';

const navigate = (path: any) => console.log(`Navigating to: ${path}`);
const isActive = (path: any) => path === '/dashboard';

const navItems = [
  {
    path: '/dashboard',
    labelKey: 'tabs.dashboard', 
    icon: 'grid-outline',
  },
  {
    path: '/gardens',
    labelKey: 'tabs.gardens', 
    icon: 'leaf-outline',
  },
  {
    path: '/settings',
    labelKey: 'tabs.settings', 
    icon: 'settings-outline',
  },
];

export default function BottomTabs({mode}:any) {
  const color: any = useThemeColors(mode||"light");
  const { t } = useTranslation(); 
 const { language } = useLanguage(); 
 useEffect(()=>{
  console.log("tabsssss:",language);
 },[language])
  return (
    <BlurView intensity={60} style={styles.nav}>
      <View style={styles.container}>
        {navItems.map((item: any) => (
          <TouchableOpacity
            key={item.path}
            onPress={() => navigate(item.path)}
            style={styles.button}
          >
            <Ionicons
              name={item.icon}
              size={20}
              color={isActive(item.path) ? color.success : color.icons} 
            />
            <Text
              style={[
                styles.label,
                isActive(item.path) && styles.activeLabel, 
                { color: isActive(item.path) ? color.success : color.icons },
                globalStyles.text,
              ]}
            >
              {t(item.labelKey)} 
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)', 
    height: 60, 
    zIndex: 1000,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  label: {
    fontSize: 10,
    marginTop: 4,
    color: '#6b7280',
  },
  activeLabel: {
    color: '#3b82f6',
    fontWeight: '500',
  },
});