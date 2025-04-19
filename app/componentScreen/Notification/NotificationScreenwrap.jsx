import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, StatusBar, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Notification from './notification';
import LoadingScreen from "../../components/Loading";
import HeaderNotification from "./Header";
import { globalStyles } from "../../utils/Fonts";
import Tabbar from '../../components/tabs';
import { useThemeColors } from "../../utils/colors";
import { useTranslation } from 'react-i18next'; // إضافة useTranslation
import i18n from "../../utils/i18n";
import { getLanguage, getModeScreen } from "../../utils/serviceAutorisation";
import Layout from '../../screens/layout'
// بيانات الإشعارات
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "temperature",
    title: "Temperature too high",
    message: "Temperature in Patio Garden is above optimal range (28°C)",
    garden: "Patio Garden",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "ph",
    title: "pH level out of range",
    message: "pH level in Basement Setup is too high (7.8)",
    garden: "Basement Setup",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "water",
    title: "Water level low",
    message: "Water level in Basement Setup is running low",
    garden: "Basement Setup",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 4,
    type: "wifi",
    title: "WiFi connection lost",
    message: "Kitchen Tower has lost WiFi connection",
    garden: "Kitchen Tower",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "harvest",
    title: "Plants ready for harvest",
    message: "Basil in Kitchen Tower is ready to harvest",
    garden: "Kitchen Tower",
    time: "Yesterday",
    read: true,
  },
  {
    id: 6,
    type: "system",
    title: "System update available",
    message: "A new system update (v2.0.1) is available for your Tower Garden app",
    garden: null,
    time: "2 days ago",
    read: true,
  },
  {
    id: 7,
    type: "temperature",
    title: "Temperature back to normal",
    message: "Temperature in Patio Garden is now within optimal range (24°C)",
    garden: "Patio Garden",
    time: "3 days ago",
    read: true,
  },
  {
    id: 1,
    type: "temperature",
    title: "Temperature too high",
    message: "Temperature in Patio Garden is above optimal range (28°C)",
    garden: "Patio Garden",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "ph",
    title: "pH level out of range",
    message: "pH level in Basement Setup is too high (7.8)",
    garden: "Basement Setup",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "water",
    title: "Water level low",
    message: "Water level in Basement Setup is running low",
    garden: "Basement Setup",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 4,
    type: "wifi",
    title: "WiFi connection lost",
    message: "Kitchen Tower has lost WiFi connection",
    garden: "Kitchen Tower",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "harvest",
    title: "Plants ready for harvest",
    message: "Basil in Kitchen Tower is ready to harvest",
    garden: "Kitchen Tower",
    time: "Yesterday",
    read: true,
  },
  {
    id: 6,
    type: "system",
    title: "System update available",
    message: "A new system update (v2.0.1) is available for your Tower Garden app",
    garden: null,
    time: "2 days ago",
    read: true,
  },
  {
    id: 7,
    type: "temperature",
    title: "Temperature back to normal",
    message: "Temperature in Patio Garden is now within optimal range (24°C)",
    garden: "Patio Garden",
    time: "3 days ago",
    read: true,
  },
]



export default function NotificationsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [mode, setMode] = useState("light");
  const { t } = useTranslation();
    useEffect(() => {
      setNotifications(MOCK_NOTIFICATIONS);
      setLoading(false);
  
      const fetchMode = async () => {
        const modeFromStorage = await getModeScreen();
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
  
    const Colors = useThemeColors(mode);
  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return notifications.filter((notification) => !notification.read);
      case "alerts":
        return notifications.filter((notification) =>
          ["temperature", "ph", "water", "wifi"].includes(notification.type),
        );
      case "system":
        return notifications.filter((notification) => notification.type === "system");
      default:
        return notifications;
    }
  };

  const filteredNotifications = getFilteredNotifications();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }, globalStyles.text]}>
      {/* Header */}
      <HeaderNotification mode={mode} />
      <View style={{ height: 50 }} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.container2}>
          {/* Search Input Section */}
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={16}
              color={Colors.text}
              style={styles.searchIcon}
            />
            <TextInput
              style={[styles.input, { backgroundColor: Colors.inputs, borderColor: Colors.border, color: Colors.text }]}
              placeholder={t('notifications.searchPlaceholder')} // استخدام الترجمة
              placeholderTextColor={Colors.therdcolor}
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>

          {/* Filter Button Section */}
          <TouchableOpacity style={styles.filterButton}>
            <AntDesign name="filter" size={24} color={Colors.text} />
            <Text style={[styles.filterButtonText, { color: Colors.text }, globalStyles.text]}>
              {t('notifications.filter')} {/* استخدام الترجمة */}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {["all", "unread", "alerts", "system"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tabButton,
                activeTab === tab && styles.activeTabButton,
              ]}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                  { color: Colors.text },
                  globalStyles.text,
                ]}>
           
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Notifications List */}
        <Notification
          filteredNotifications={filteredNotifications}
          activeTab={activeTab}
        
        />
      </ScrollView>
    </SafeAreaView>
    </Layout>
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
  container2: {
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
    fontSize: 16, // Font size
    fontWeight: '600', // Bold text weight
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerActions: {
    flexDirection: "row",
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  tabBadge: {
    marginLeft: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBadgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    textAlign: "center",
  },
  notificationsCard: {
    padding: 0,
    overflow: "hidden",
  },
  notificationItem: {
    flexDirection: "row",
    padding: 16,
    borderLeftWidth: 3,
  },
  readNotification: {
    opacity: 0.8,
  },
  unreadNotification: {
    backgroundColor: "rgba(16, 185, 129, 0.05)",
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  notificationTime: {
    fontSize: 12,
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    marginBottom: 4,
  },
  notificationGarden: {
    flexDirection: "row",
    alignItems: "center",
  },
  gardenIcon: {
    marginRight: 4,
  },
  gardenName: {
    fontSize: 12,
    fontWeight: "500",
  },
  notificationActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
  divider: {
    height: 1,
    width: "100%",
  },
  card: {
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  outline: {
    borderWidth: 1,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 14,
  },
})

