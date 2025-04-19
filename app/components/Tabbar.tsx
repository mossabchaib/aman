import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// استيراد الشاشات
import DashboardScreen from '../screens/DashboardScreen';
import GardenScreen from '../screens/ProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';

export default function MainScreen() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  // تحديد الشاشة النشطة
  const renderScreen = () => {
    switch (activeTab) {
      case 'Dashboard':
        return ;
      case 'Garden':
        return <GardenScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {/* عرض الشاشة النشطة */}
      <View style={styles.screenContainer}>
      </View>

      {/* شريط التبويبات */}
      <View style={styles.tabBar}>
        <View icon="home" label="home" isActive={activeTab === 'Dashboard'} onPress={() => setActiveTab('Dashboard')} />
        <View icon="leaf" label="garden" isActive={activeTab === 'Garden'} onPress={() => setActiveTab('Garden')} />
        <View icon="person" label="profile" isActive={activeTab === 'Profile'} onPress={() => setActiveTab('Profile')} />
      </View>
    </View>
  );
}

// مكون عنصر التبويب
const TabItem = ({ icon, label, isActive, onPress }:any) => {
  return (
    <TouchableOpacity style={styles.tabItem} onPress={onPress}>
      <Ionicons name={isActive ? icon : `${icon}-outline`} size={26} color={isActive ? '#4CAF50' : 'gray'} />
      <Text style={[styles.tabLabel, { color: isActive ? '#4CAF50' : 'gray' }]}>{label}</Text>
    </TouchableOpacity>
  );
};

// الأنماط
const styles = StyleSheet.create({
  container: {
    
  },
  screenContainer: {
  
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});

