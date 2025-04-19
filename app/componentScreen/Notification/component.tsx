import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for icons
import AntDesign from '@expo/vector-icons/AntDesign';
import { useThemeColors } from '@/app/utils/colors';
export default function SearchAndFilter() {
  const [searchQuery, setSearchQuery] = useState('');
  const Colors:any=useThemeColors;
  return (
    <View style={styles.container}>
      {/* Search Input Section */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search" // Replace with your desired search icon
          size={16}
          color={Colors().text} // Tailwind's text-muted-foreground equivalent
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search gardens..."
          placeholderTextColor="#9ca3af" // Tailwind's text-muted-foreground equivalent
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      {/* Filter Button Section */}
      <TouchableOpacity style={styles.filterButton}>
      <AntDesign name="filter" size={24} color={Colors().text} />
        <Text style={[styles.filterButtonText,{color:Colors().text}]}>Filter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Equivalent to flex-row
    justifyContent: 'space-between', // Equivalent to justify-between
    alignItems: 'center', // Align items vertically
    gap: 6, // Equivalent to gap-3
    padding: 16, // Add padding for better spacing
  },
  searchContainer: {
    flex: 1, // Equivalent to flex-1
    position: 'relative', // To position the search icon absolutely
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: [{ translateY: -8 }], // Center vertically (equivalent to -translate-y-1/2)
  },
  input: {
    paddingLeft: 40, // Space for the search icon (equivalent to pl-9)
    height: 46, // Fixed height for consistency
    borderColor: '#d1d5db', // Tailwind's border-gray-300 equivalent
    borderWidth: 1,
    borderRadius: 6, // Rounded corners
    backgroundColor: '#fff', // White background
    fontSize: 16, // Font size
    color: '#1f2937', // Tailwind's text-gray-800 equivalent
  },
  filterButton: {
    flexDirection: 'row', // Arrange icon and text horizontally
    alignItems: 'center', // Align items vertically
    gap: 8, // Space between icon and text (equivalent to gap-2)
    paddingVertical: 8, // Vertical padding
    paddingHorizontal: 12, // Horizontal padding
    borderWidth: 1, // Border for outline button
    borderColor: '#d1d5db', // Tailwind's btn-outline blue equivalent
    borderRadius: 6, // Rounded corners
  },
  filterButtonText: {
    fontSize: 18, // Font size
    fontWeight: '600', // Bold text weight
  },
});