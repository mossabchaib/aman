"use client"

import { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { BarCodeScanner } from "expo-barcode-scanner"
import { Camera } from "expo-camera"
import { StatusBar } from "expo-status-bar"
import { globalStyles } from "../../utils/Fonts"

import { useTranslation } from "react-i18next"
import i18n from "../../utils/i18n"
import { useLanguage } from "@/app/context/LanguageContext"
import { getLanguage, getModeScreen } from "@/app/utils/serviceAutorisation"
import { useThemeColors } from "@/app/utils/colors"

// Define garden types
const gardenTypes = [
  { id: "outdoor", label: "gardenTypes.outdoor", icon: "sunny" },
  { id: "indoor", label: "gardenTypes.indoor", icon: "cloud" },
  { id: "raised-bed", label: "gardenTypes.raisedBed", icon: "grid" },
  { id: "container", label: "gardenTypes.container", icon: "leaf" },
]

// Define smart features
const smartFeatures = [
  {
    id: "autoWatering",
    label: "smartFeatures.autoWatering.title",
    description: "smartFeatures.autoWatering.description",
    icon: "water",
  },
  {
    id: "soilMoistureSensors",
    label: "smartFeatures.soilMoistureSensors.title",
    description: "smartFeatures.soilMoistureSensors.description",
    icon: "water-outline",
  },
  {
    id: "temperatureSensors",
    label: "smartFeatures.temperatureSensors.title",
    description: "smartFeatures.temperatureSensors.description",
    icon: "thermometer",
  },
  {
    id: "lightSensors",
    label: "smartFeatures.lightSensors.title",
    description: "smartFeatures.lightSensors.description",
    icon: "sunny-outline",
  },
]

// Define form data structure
interface FormData {
  name: string
  type: string
  location: string
  description: string
  autoWatering: boolean
  soilMoistureSensors: boolean
  temperatureSensors: boolean
  lightSensors: boolean
  gardenId?: string
}

interface NewGardenProps {
  navigation: any
  route: any
}

export default function NewGardenScreen({ navigation, route }: NewGardenProps) {
  const isEditMode = route?.params?.isEditMode || false
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isScannerVisible, setIsScannerVisible] = useState<boolean>(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [scanned, setScanned] = useState<boolean>(false)
  const scrollViewRef = useRef<ScrollView>(null)
  const [mode, setMode] = useState<"light" | "dark">("light")
  const { t } = useTranslation()
  const { language } = useLanguage()

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: isEditMode ? "My Garden" : "",
    type: "outdoor",
    location: isEditMode ? "Backyard" : "",
    description: isEditMode ? "A beautiful garden with various plants and flowers." : "",
    autoWatering: isEditMode,
    soilMoistureSensors: isEditMode,
    temperatureSensors: isEditMode,
    lightSensors: isEditMode,
  })

  // Fetch theme mode and language from storage
  useEffect(() => {
    const fetchMode = async () => {
      const modeFromStorage: any = await getModeScreen()
      if (modeFromStorage && modeFromStorage !== mode) {
        setMode(modeFromStorage)
      }
    }

    fetchMode()

    const fetchLanguage = async () => {
      const lang = await getLanguage()
      if (lang && lang !== i18n.language) {
        i18n.changeLanguage(lang)
      }
    }

    fetchLanguage()
  }, [])

  // Log language changes
  useEffect(() => {
    console.log("NewGardenScreen:", language)
  }, [language])

  const COLORS = useThemeColors(mode)

  // Request camera permission for QR Code scanning
  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])

  // Handle QR Code scanning
  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true)
    try {
      // Attempt to parse the QR code data
      const gardenData = JSON.parse(data)

      if (gardenData.gardenId) {
        // Update form with scanned garden ID
        setFormData((prev) => ({
          ...prev,
          gardenId: gardenData.gardenId,
          name: gardenData.name || prev.name,
          type: gardenData.type || prev.type,
        }))

        Alert.alert(t("newGarden.gardenAttached"), `${t("newGarden.gardenAttachedMessage")} ${gardenData.gardenId}`, [
          { text: "OK" },
        ])
      } else {
        Alert.alert(t("newGarden.invalidQRCode"), t("newGarden.invalidQRCodeMessage"))
      }
    } catch (error) {
      Alert.alert(t("newGarden.scanError"), t("newGarden.scanErrorMessage"))
    } finally {
      setIsScannerVisible(false)
    }
  }

  // Handle text input changes
  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle switch toggles
  const handleSwitchChange = (name: keyof FormData, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  // Handle garden type selection
  const handleTypeSelect = (typeId: string) => {
    setFormData((prev) => ({ ...prev, type: typeId }))
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      Alert.alert(t("newGarden.scanError"), t("newGarden.nameRequired"))
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      Alert.alert(t("newGarden.scanError"), isEditMode ? t("newGarden.updateSuccess") : t("newGarden.saveSuccess"), [
        { text: "OK", onPress: () => navigation.goBack() },
      ])
    } catch (error) {
      Alert.alert(t("newGarden.scanError"), t("newGarden.saveError"))
    } finally {
      setIsLoading(false)
    }
  }

  // Handle delete garden
  const handleDelete = async () => {
    if (!isEditMode) return

    Alert.alert(t("newGarden.deleteConfirm"), t("newGarden.deleteConfirmMessage"), [
      { text: t("newGarden.cancel"), style: "cancel" },
      {
        text: t("newGarden.delete"),
        style: "destructive",
        onPress: async () => {
          setIsLoading(true)
          try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            Alert.alert(t("newGarden.scanError"), t("newGarden.deleteSuccess"), [
              { text: "OK", onPress: () => navigation.goBack() },
            ])
          } catch (error) {
            Alert.alert(t("newGarden.scanError"), t("newGarden.deleteError"))
          } finally {
            setIsLoading(false)
          }
        },
      },
    ])
  }

  // Custom Switch component
  const CustomSwitch = ({ value, onValueChange }: any) => (
    <TouchableOpacity
      style={[styles.switchTrack, { backgroundColor: value ? COLORS.success : "#d1d5db" }]}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.8}
    >
      <View style={[styles.switchThumb, { transform: [{ translateX: value ? 18 : 0 }] }]} />
    </TouchableOpacity>
  )

  // Render QR code scanner
  if (isScannerVisible) {
    if (hasPermission === null) {
      return (
        <View style={styles.scannerContainer}>
          <Text>{t("newGarden.scannerPermission")}</Text>
        </View>
      )
    }
    if (hasPermission === false) {
      return (
        <View style={styles.scannerContainer}>
          <Text>{t("newGarden.noCamera")}</Text>
        </View>
      )
    }

    return (
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.scannerOverlay}>
          <View style={styles.scannerTargetBox} />
        </View>
        <TouchableOpacity style={styles.closeScannerButton} onPress={() => setIsScannerVisible(false)}>
          <Ionicons name="close-circle" size={40} color="white" />
        </TouchableOpacity>
        <Text style={[styles.scannerText, globalStyles.text]}>{t("newGarden.scanInstructions")}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
      <StatusBar style={mode === "dark" ? "light" : "dark"} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: COLORS.text }, globalStyles.text]}>
              {isEditMode ? t("newGarden.editTitle") : t("newGarden.title")}
            </Text>
            {isEditMode && (
              <TouchableOpacity onPress={handleDelete} style={[styles.deleteButton, { borderColor: COLORS.danger }]}>
                <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
                <Text style={[styles.deleteButtonText, { color: COLORS.danger }, globalStyles.text]}>
                  {t("newGarden.delete")}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Form */}
          <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false} ref={scrollViewRef}>
            {/* Garden Name */}
            <View style={[styles.card, { backgroundColor: COLORS.card }]}>
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: COLORS.text }, globalStyles.text]}>
                  {t("newGarden.gardenName")} <Text style={{ color: COLORS.danger }}>*</Text>
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: COLORS.inputs, borderColor: COLORS.border, color: COLORS.text },
                  ]}
                  placeholder={t("newGarden.gardenNamePlaceholder")}
                  value={formData.name}
                  onChangeText={(text) => handleChange("name", text)}
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>

              {/* Garden Type */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: COLORS.text }, globalStyles.text]}>
                  {t("newGarden.gardenType")}
                </Text>
                <View style={styles.typeGrid}>
                  {gardenTypes.map((type: any) => (
                    <TouchableOpacity
                      key={type.id}
                      style={[
                        styles.typeOption,
                        {
                          borderColor: formData.type === type.id ? COLORS.success : COLORS.border,
                          backgroundColor: formData.type === type.id ? `${COLORS.success}20` : COLORS.inputs,
                        },
                      ]}
                      onPress={() => handleTypeSelect(type.id)}
                    >
                      <Ionicons
                        name={type.icon}
                        size={24}
                        color={formData.type === type.id ? COLORS.success : COLORS.icons}
                      />
                      <Text
                        style={[
                          styles.typeLabel,
                          {
                            color: formData.type === type.id ? COLORS.success : COLORS.text,
                          },
                          globalStyles.text,
                        ]}
                      >
                        {t(type.label)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Location */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: COLORS.text }, globalStyles.text]}>{t("newGarden.location")}</Text>
                <View style={[styles.inputWithIcon, { borderColor: COLORS.border, backgroundColor: COLORS.inputs }]}>
                  <Ionicons name="location-outline" size={20} color={COLORS.icons} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.inputWithIconField, { color: COLORS.text }]}
                    placeholder={t("newGarden.locationPlaceholder")}
                    value={formData.location}
                    onChangeText={(text) => handleChange("location", text)}
                    placeholderTextColor={COLORS.textSecondary}
                  />
                </View>
              </View>

              {/* Description */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: COLORS.text }, globalStyles.text]}>
                  {t("newGarden.description")}
                </Text>
                <TextInput
                  style={[
                    styles.textArea,
                    { backgroundColor: COLORS.inputs, borderColor: COLORS.border, color: COLORS.text },
                  ]}
                  multiline
                  numberOfLines={4}
                  placeholder={t("newGarden.descriptionPlaceholder")}
                  value={formData.description}
                  onChangeText={(text) => handleChange("description", text)}
                  placeholderTextColor={COLORS.textSecondary}
                  textAlignVertical="top"
                />
              </View>
            </View>

            {/* QR Code Scanner Button */}
            <TouchableOpacity
              style={[styles.scanButton, { backgroundColor: COLORS.secondary }]}
              onPress={() => setIsScannerVisible(true)}
            >
              <View style={styles.scanButtonContent}>
                <Ionicons name="qr-code" size={24} color="white" />
                <Text style={[styles.scanButtonText, globalStyles.text]}>
                  {formData.gardenId ? t("newGarden.scanNewQRCode") : t("newGarden.scanQRCode")}
                </Text>
              </View>
              <View style={styles.scanIconContainer}>
                <Ionicons name="scan-outline" size={20} color="white" />
              </View>
            </TouchableOpacity>

            {formData.gardenId && (
              <View
                style={[
                  styles.attachedGardenInfo,
                  { backgroundColor: `${COLORS.success}20`, borderColor: COLORS.success },
                ]}
              >
                <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                <Text style={[styles.attachedGardenText, { color: COLORS.text }, globalStyles.text]}>
                  {t("newGarden.gardenID")}: {formData.gardenId}
                </Text>
              </View>
            )}

            {/* Smart Garden Features */}
            <View style={[styles.card, { backgroundColor: COLORS.card }]}>
              <Text style={[styles.sectionTitle, { color: COLORS.text }, globalStyles.text]}>
                {t("newGarden.smartFeatures")}
              </Text>

              {smartFeatures.map((feature: any, index) => (
                <View
                  key={feature.id}
                  style={[
                    styles.featureRow,
                    index < smartFeatures.length - 1 && { borderBottomWidth: 1, borderBottomColor: COLORS.border },
                  ]}
                >
                  <View style={styles.featureInfo}>
                    <View style={styles.featureHeader}>
                      <Ionicons name={feature.icon} size={18} color={COLORS.success} style={styles.featureIcon} />
                      <Text style={[styles.featureLabel, { color: COLORS.text }, globalStyles.text]}>
                        {t(feature.label)}
                      </Text>
                    </View>
                    <Text style={[styles.featureDescription, { color: COLORS.textSecondary }, globalStyles.text]}>
                      {t(feature.description)}
                    </Text>
                  </View>
                  <CustomSwitch
                    value={formData[feature.id as keyof FormData] as boolean}
                    onValueChange={(checked: boolean) => handleSwitchChange(feature.id as keyof FormData, checked)}
                  />
                </View>
              ))}
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.cancelButton, { borderColor: COLORS.border, backgroundColor: COLORS.inputs }]}
                onPress={() => navigation.goBack()}
                disabled={isLoading}
              >
                <Text style={[styles.cancelButtonText, { color: COLORS.textSecondary }, globalStyles.text]}>
                  {t("newGarden.cancel")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: COLORS.success }]}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <>
                    <Ionicons name="save-outline" size={18} color="white" style={styles.saveButtonIcon} />
                    <Text style={[styles.saveButtonText, globalStyles.text]}>
                      {isEditMode ? t("newGarden.update") : t("newGarden.save")}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    marginLeft: 8,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  formContainer: {
    flex: 1,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
  },
  inputIcon: {
    paddingHorizontal: 12,
  },
  inputWithIconField: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    minHeight: 100,
  },
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  typeOption: {
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  typeLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  featureInfo: {
    flex: 1,
    marginRight: 12,
  },
  featureHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  featureIcon: {
    marginRight: 8,
  },
  featureLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  featureDescription: {
    fontSize: 14,
    marginLeft: 26,
  },
  switchTrack: {
    width: 46,
    height: 28,
    borderRadius: 14,
    padding: 2,
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "white",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 40,
  },
  cancelButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  saveButton: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  saveButtonIcon: {
    marginRight: 8,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  scanButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  scanButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  scanIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    padding: 6,
  },
  attachedGardenInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  attachedGardenText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  scannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  scannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  scannerTargetBox: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 16,
    backgroundColor: "transparent",
  },
  closeScannerButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  scannerText: {
    position: "absolute",
    bottom: 80,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
})

