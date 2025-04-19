"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Modal,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  I18nManager,
} from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Ionicons, Feather } from "@expo/vector-icons"
import { useTranslation } from "react-i18next"

import { useThemeColors } from "@/app/utils/colors" 
import type { GardenDetail } from "./types/garden"
import SensorCard from "./garden/SensorCard"
import PlantItem from "./garden/PlantItem"
import SensorItem from "./garden/SensorItem"
import NotificationItem from "./garden/NotificationItem"
import Toast from "./ui/Toast.tsx"
import LanguageSelector from "./ui/LanguageSelector"
import ThemeToggle from "./ui/ThemeToggle"
import i18n from "../../utils/i18n"
import { getLanguage, getLAutorationNotification, getModeScreen } from "@/app/utils/serviceAutorisation"

const GardenDetailScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { t } = useTranslation()
  const systemColorScheme = useColorScheme()
  const [mode, setMode] = useState<"light" | "dark">("light")
  const COLORS = useThemeColors(mode)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  // State
  const [isLoading, setIsLoading] = useState(true)
  const [garden, setGarden] = useState<GardenDetail | null>(null)
  const [activeTab, setActiveTab] = useState<"plants" | "sensors" | "settings">("plants")
  const [showOptions, setShowOptions] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  useEffect(() => {
    const fetchMode = async () => {
      const modeFromStorage: any = await getModeScreen()
      if (modeFromStorage && modeFromStorage !== mode) {
        setMode(modeFromStorage)
      }
    }

    const fetchLanguage = async () => {
      const lang = await getLanguage()
      if (lang && lang !== i18n.language) {
        i18n.changeLanguage(lang)
      }
    }

    const fetchNotificationPermission = async () => {
      const isEnabled = await getLAutorationNotification()
      setNotificationsEnabled(isEnabled)
    }

    fetchMode()
    fetchLanguage()
    fetchNotificationPermission()
  }, [])

  // Get garden ID from route params
  const id = route.params?.id || "1"

  // Fetch garden details
  const fetchGardenDetail = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data
      const mockGarden: GardenDetail = {
        id: id,
        name: "Vegetable Garden",
        type: "Outdoor",
        description: "A small vegetable garden with various seasonal vegetables.",
        createdAt: "2023-06-15",
        plants: [
          {
            id: "p1",
            name: "Tomato Plant",
            type: "Vegetable",
            health: "good",
            waterNeeds: "medium",
            sunNeeds: "high",
          },
          {
            id: "p2",
            name: "Bell Pepper",
            type: "Vegetable",
            health: "warning",
            waterNeeds: "medium",
            sunNeeds: "high",
          },
          {
            id: "p3",
            name: "Cucumber",
            type: "Vegetable",
            health: "good",
            waterNeeds: "high",
            sunNeeds: "medium",
          },
          {
            id: "p4",
            name: "Lettuce",
            type: "Leafy Green",
            health: "poor",
            waterNeeds: "medium",
            sunNeeds: "low",
          },
          {
            id: "p5",
            name: "Basil",
            type: "Herb",
            health: "warning",
            waterNeeds: "medium",
            sunNeeds: "medium",
          },
        ],
        sensors: {
          moisture: { value: 78, timestamp: "2023-09-15T10:30:00Z" },
          temperature: { value: 24, timestamp: "2023-09-15T10:30:00Z" },
          sunlight: { value: 85, timestamp: "2023-09-15T10:30:00Z" },
        },
      }

      setGarden(mockGarden)
    } catch (error) {
      showToastMessage(t("errors.fetchFailed"))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGardenDetail()
  }, [id])

  // Show toast message
  const showToastMessage = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  // Handle delete garden
  const handleDeleteGarden = () => {
    showToastMessage(t("garden.deleteSuccess"))
    navigation.goBack()
  }

  // Handle refresh
  const handleRefresh = () => {
    fetchGardenDetail()
  }

  // Get status color based on value
  const getStatusColor = (value: number) => {
    if (value >= 75) return COLORS.success
    if (value >= 50) return COLORS.warning
    return COLORS.danger
  }

  // Loading state
  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
        <StatusBar barStyle={mode === "dark" ? "light-content" : "dark-content"} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    )
  }

  // Garden not found
  if (!garden) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
        <StatusBar barStyle={mode === "dark" ? "light-content" : "dark-content"} />
        <View style={styles.notFoundContainer}>
          <Text style={[styles.title, { color: COLORS.text }]}>{t("garden.notFound")}</Text>
          <Text style={[styles.subtitle, { color: COLORS.textSecondary }]}>{t("garden.NotFoundDesc")}</Text>
          <TouchableOpacity style={[styles.button, { borderColor: COLORS.border }]} onPress={() => navigation.goBack()}>
            <Text style={{ color: COLORS.text }}>{t("garden.backToGardens")}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle={mode === "dark" ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: COLORS.border, borderBottomWidth: 1 }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: COLORS.text }]}>{garden.name}</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={[styles.iconButton, { borderColor: COLORS.border }]} onPress={handleRefresh}>
            <Feather name="refresh-cw" size={18} color={COLORS.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconButton, { borderColor: COLORS.border }]}
            onPress={() => setShowOptions(!showOptions)}
          >
            <Feather name="more-vertical" size={18} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={[styles.scrollView, I18nManager.isRTL && styles.rtlScrollView]}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Sensor Cards */}
        <View style={styles.sensorCardsContainer}>
          <SensorCard
            type="moisture"
            value={garden.sensors.moisture.value}
            label={t("sensors.moisture")}
            color={getStatusColor(garden.sensors.moisture.value)}
            colors={COLORS}
          />

          <SensorCard
            type="temperature"
            value={garden.sensors.temperature.value}
            label={t("sensors.temperature")}
            color={getStatusColor(garden.sensors.temperature.value * 4)}
            unit="°C"
            colors={COLORS}
          />

          <SensorCard
            type="sunlight"
            value={garden.sensors.sunlight.value}
            label={t("sensors.sunlight")}
            color={getStatusColor(garden.sensors.sunlight.value)}
            colors={COLORS}
          />
        </View>

        {/* Tab Navigation */}
        <View style={[styles.tabContainer, { backgroundColor: COLORS.cardBackground, borderColor: COLORS.border }]}>
          <View style={styles.tabHeader}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "plants" && [styles.activeTabButton, { borderBottomColor: COLORS.primary }],
              ]}
              onPress={() => setActiveTab("plants")}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  { color: activeTab === "plants" ? COLORS.primary : COLORS.textSecondary },
                ]}
              >
                {t("Tabs.plants")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "sensors" && [styles.activeTabButton, { borderBottomColor: COLORS.primary }],
              ]}
              onPress={() => setActiveTab("sensors")}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  { color: activeTab === "sensors" ? COLORS.primary : COLORS.textSecondary },
                ]}
              >
                {t("Tabs.sensors")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "settings" && [styles.activeTabButton, { borderBottomColor: COLORS.primary }],
              ]}
              onPress={() => setActiveTab("settings")}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  { color: activeTab === "settings" ? COLORS.primary : COLORS.textSecondary },
                ]}
              >
                {t("Tabs.settings")}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tabContent}>
            {/* Plants Tab */}
            {activeTab === "plants" && (
              <View style={styles.tabContentInner}>
                <View style={styles.sectionHeader}>
                  <Text style={[styles.sectionTitle, { color: COLORS.text }]}>{t("plants.list")}</Text>
                  <TouchableOpacity
                    style={[styles.addButton, { borderColor: COLORS.border }]}
                    onPress={() => navigation.navigate("AddPlant", { gardenId: garden.id })}
                  >
                    <Feather name="plus" size={16} color={COLORS.text} />
                    <Text style={[styles.addButtonText, { color: COLORS.text }]}>{t("plants.add")}</Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.plantListHeader, { borderBottomColor: COLORS.border }]}>
                  <Text style={[styles.plantListHeaderText, { color: COLORS.textSecondary, flex: 2 }]}>
                    {t("plants.plant")}
                  </Text>
                  <Text style={[styles.plantListHeaderText, { color: COLORS.textSecondary, flex: 1 }]}>
                    {t("plants.type")}
                  </Text>
                  <Text style={[styles.plantListHeaderText, { color: COLORS.textSecondary, flex: 1 }]}>
                    {t("plants.water")}
                  </Text>
                  <Text style={[styles.plantListHeaderText, { color: COLORS.textSecondary, flex: 1 }]}>
                    {t("plants.sun")}
                  </Text>
                </View>

                {garden.plants.map((plant) => (
                  <PlantItem key={plant.id} plant={plant} colors={COLORS} />
                ))}
              </View>
            )}

            {/* Sensors Tab */}
            {activeTab === "sensors" && (
              <View style={styles.tabContentInner}>
                <Text style={[styles.sectionTitle, { color: COLORS.text }]}>{t("sensors.data")}</Text>
                <Text style={[styles.sectionDescription, { color: COLORS.textSecondary }]}>
                  {t("sensors.description")}
                </Text>

                <View
                  style={[styles.dataCollectionCard, { backgroundColor: COLORS.muted, borderColor: COLORS.border }]}
                >
                  <View>
                    <Text style={[styles.dataCollectionTitle, { color: COLORS.text }]}>{t("sensors.collection")}</Text>
                    <Text style={[styles.dataCollectionDesc, { color: COLORS.textSecondary }]}>
                      {t("sensors.collectionDesc")}
                    </Text>
                  </View>
                  <TouchableOpacity style={[styles.configureButton, { borderColor: COLORS.border }]}>
                    <Text style={{ color: COLORS.text }}>{t("common.configure")}</Text>
                  </TouchableOpacity>
                </View>

                {Object.entries(garden.sensors).map(([key, data]) => (
                  <SensorItem
                    key={key}
                    type={key as "moisture" | "temperature" | "sunlight"}
                    value={data.value}
                    timestamp={data.timestamp}
                    colors={COLORS}
                  />
                ))}

                <View style={styles.viewHistoryContainer}>
                  <TouchableOpacity style={[styles.viewHistoryButton, { borderColor: COLORS.border }]}>
                    <Text style={{ color: COLORS.text }}>{t("sensors.viewHistory")}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <View style={styles.tabContentInner}>
                <Text style={[styles.sectionTitle, { color: COLORS.text }]}>{t("Settings.garden")}</Text>
                <Text style={[styles.sectionDescription, { color: COLORS.textSecondary }]}>
                  {t("Settings.description")}
                </Text>

                <View style={[styles.settingsCard, { backgroundColor: COLORS.muted, borderColor: COLORS.border }]}>
                  <View style={styles.settingsCardHeader}>
                    <Text style={[styles.settingsCardTitle, { color: COLORS.text }]}>{t("Settings.info")}</Text>
                    <TouchableOpacity>
                      <Text style={{ color: COLORS.secondary }}>{t("common.edit")}</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.gardenInfoGrid}>
                    <View style={styles.gardenInfoItem}>
                      <Text style={[styles.gardenInfoLabel, { color: COLORS.textSecondary }]}>{t("garden.name")}</Text>
                      <Text style={[styles.gardenInfoValue, { color: COLORS.text }]}>{garden.name}</Text>
                    </View>

                    <View style={styles.gardenInfoItem}>
                      <Text style={[styles.gardenInfoLabel, { color: COLORS.textSecondary }]}>{t("garden.type")}</Text>
                      <Text style={[styles.gardenInfoValue, { color: COLORS.text }]}>{garden.type}</Text>
                    </View>

                    <View style={[styles.gardenInfoItem, { flex: 2 }]}>
                      <Text style={[styles.gardenInfoLabel, { color: COLORS.textSecondary }]}>
                        {t("garden.description")}
                      </Text>
                      <Text style={[styles.gardenInfoValue, { color: COLORS.text }]}>{garden.description}</Text>
                    </View>

                    <View style={styles.gardenInfoItem}>
                      <Text style={[styles.gardenInfoLabel, { color: COLORS.textSecondary }]}>
                        {t("garden.created")}
                      </Text>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Feather name="calendar" size={14} color={COLORS.textSecondary} style={{ marginRight: 4 }} />
                        <Text style={[styles.gardenInfoValue, { color: COLORS.text }]}>{garden.createdAt}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.notificationsSection}>
                  <View style={[styles.notificationsHeader, { borderBottomColor: COLORS.border }]}>
                    <Text style={[styles.notificationsTitle, { color: COLORS.text }]}>{t("Notifications.title")}</Text>
                  </View>

                  <NotificationItem
                    title={t("Notifications.moisture")}
                    description={t("Notifications.moistureDesc")}
                    enabled={notificationsEnabled}
                    colors={COLORS}
                  />

                  <NotificationItem
                    title={t("Notifications.temperature")}
                    description={t("Notifications.temperatureDesc")}
                    enabled={false}
                    colors={COLORS}
                  />

                  <NotificationItem
                    title={t("Notifications.watering")}
                    description={t("Notifications.wateringDesc")}
                    enabled={false}
                    colors={COLORS}
                  />
                </View>

                <View style={styles.advancedSettingsContainer}>
                  <TouchableOpacity
                    style={[styles.advancedSettingsButton, { backgroundColor: COLORS.primary }]}
                    onPress={() => navigation.navigate("EditGarden", { gardenId: garden.id })}
                  >
                    <Feather name="settings" size={16} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={{ color: "#fff", fontWeight: "600" }}>{t("Settings.advanced")}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Options Modal */}
      <Modal visible={showOptions} transparent={true} animationType="fade" onRequestClose={() => setShowOptions(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowOptions(false)}>
          <View
            style={[
              styles.optionsContainer,
              {
                backgroundColor: COLORS.cardBackground,
                borderColor: COLORS.border,
                top: 60,
                right: I18nManager.isRTL ? undefined : 20,
                left: I18nManager.isRTL ? 20 : undefined,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => {
                setShowOptions(false)
                navigation.navigate("EditGarden", { gardenId: garden.id })
              }}
            >
              <Feather name="edit" size={16} color={COLORS.text} style={{ marginRight: 8 }} />
              <Text style={{ color: COLORS.text }}>{t("garden.edit")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => {
                setShowOptions(false)
                handleDeleteGarden()
              }}
            >
              <Feather name="trash-2" size={16} color={COLORS.danger} style={{ marginRight: 8 }} />
              <Text style={{ color: COLORS.danger }}>{t("garden.delete")}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Toast Message */}
      {showToast && <Toast message={toastMessage} colors={COLORS} />}

      {/* Language Selector (for demo purposes) */}
      <LanguageSelector colors={COLORS} />

      {/* Theme Toggle (for demo purposes) */}
      <ThemeToggle mode={mode} setMode={setMode} colors={COLORS} />
    </SafeAreaView>
  )
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  rtlScrollView: {
    transform: [{ scaleX: -1 }],
  },
  scrollViewContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
  },
  sensorCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  tabContainer: {
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
  },
  tabHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTabButton: {
    borderBottomWidth: 2,
  },
  tabButtonText: {
    fontWeight: "500",
  },
  tabContent: {
    padding: 16,
  },
  tabContentInner: {},
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 4,
    marginBottom: 16,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
  },
  addButtonText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "500",
  },
  plantListHeader: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  plantListHeaderText: {
    fontSize: 12,
    fontWeight: "500",
  },
  dataCollectionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
  },
  dataCollectionTitle: {
    fontWeight: "600",
    marginBottom: 4,
  },
  dataCollectionDesc: {
    fontSize: 12,
  },
  configureButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
  },
  viewHistoryContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  viewHistoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
  },
  settingsCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  settingsCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  settingsCardTitle: {
    fontWeight: "600",
  },
  gardenInfoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gardenInfoItem: {
    width: "50%",
    marginBottom: 16,
  },
  gardenInfoLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  gardenInfoValue: {
    fontWeight: "500",
  },
  notificationsSection: {
    marginBottom: 16,
  },
  notificationsHeader: {
    paddingBottom: 8,
    marginBottom: 16,
    borderBottomWidth: 1,
  },
  notificationsTitle: {
    fontWeight: "600",
  },
  advancedSettingsContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  advancedSettingsButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  optionsContainer: {
    position: "absolute",
    width: 180,
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
})

export default GardenDetailScreen

