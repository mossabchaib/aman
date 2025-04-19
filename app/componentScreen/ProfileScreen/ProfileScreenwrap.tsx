"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import { useThemeColors } from "@/app/utils/colors"  
import { globalStyles } from "@/app/utils/Fonts" 
import { useTranslation } from "react-i18next"
import i18n from "@/app/utils/i18n" 
import { useLanguage } from "@/app/context/LanguageContext"
import { getLanguage, getModeScreen } from "@/app/utils/serviceAutorisation"


interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
  bio: string
  avatar?: string
}

const ProfileScreen: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "Passionate about growing plants and sustainable gardening. Tower Garden enthusiast since 2020.",
  })
  const [editedProfile, setEditedProfile] = useState<UserProfile>({ ...profile })
  const [mode, setMode] = useState<"light" | "dark">("light")
  const { t } = useTranslation()
  const { language } = useLanguage()

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
    console.log("ProfileScreen:", language)
  }, [language])

  const COLORS = useThemeColors(mode)

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        setProfile(editedProfile)
        setIsEditing(false)
        setIsLoading(false)
        Alert.alert(t("profile.success.title"), t("profile.success.message"))
      }, 1000)
    } else {
      // Start editing
      setEditedProfile({ ...profile })
      setIsEditing(true)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedProfile({ ...profile })
  }

  const handleChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleChangeProfilePicture = () => {
    Alert.alert(t("profile.changeProfilePicture.title"), "", [
      {
        text: t("profile.changeProfilePicture.takePhoto"),
        onPress: () => console.log("Take Photo pressed"),
      },
      {
        text: t("profile.changeProfilePicture.chooseFromGallery"),
        onPress: () => console.log("Choose from Gallery pressed"),
      },
      {
        text: t("profile.changeProfilePicture.cancel"),
        style: "cancel",
      },
    ])
  }

  const handleGoBack = () => {
    Alert.alert("Navigate", t("profile.navigation.goBack"))
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle={mode === "dark" ? "light-content" : "dark-content"} />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: COLORS.text }, globalStyles.text]}>{t("profile.header")}</Text>
        <TouchableOpacity
          onPress={handleEditToggle}
          style={[styles.editButton, isEditing && { backgroundColor: COLORS.primary }]}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Ionicons
                name={isEditing ? "checkmark" : "pencil"}
                size={19}
                color={isEditing ? "#fff" : COLORS.primary}
              />
              <Text style={[styles.editButtonText, { color: isEditing ? "#fff" : COLORS.primary }, globalStyles.text]}>
                {isEditing ? t("profile.editButton.save") : t("profile.editButton.edit")}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={[styles.container, { backgroundColor: COLORS.background }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: `${COLORS.primary}20` }]}>
              {profile.avatar ? (
                <Image source={{ uri: profile.avatar }} style={styles.avatarImage} />
              ) : (
                <Text style={[styles.avatarText, { color: COLORS.primary }, globalStyles.text]}>
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Text>
              )}
            </View>
            {isEditing && (
              <TouchableOpacity
                style={[styles.changeAvatarButton, { backgroundColor: COLORS.primary }]}
                onPress={handleChangeProfilePicture}
              >
                <Ionicons name="camera" size={16} color="#fff" />
              </TouchableOpacity>
            )}
          </View>

          {!isEditing ? (
            <>
              <Text style={[styles.profileName, { color: COLORS.text }, globalStyles.text]}>{profile.name}</Text>
              <Text style={[styles.profileEmail, { color: COLORS.textSecondary }, globalStyles.text]}>
                {profile.email}
              </Text>

              <View style={styles.statsContainer}>
                <View style={[styles.statItem, { backgroundColor: COLORS.card }]}>
                  <Text style={[styles.statValue, { color: COLORS.primary }, globalStyles.text]}>12</Text>
                  <Text style={[styles.statLabel, { color: COLORS.textSecondary }, globalStyles.text]}>
                    {t("profile.stats.plants")}
                  </Text>
                </View>
                <View style={[styles.statItem, { backgroundColor: COLORS.card }]}>
                  <Text style={[styles.statValue, { color: COLORS.primary }, globalStyles.text]}>3</Text>
                  <Text style={[styles.statLabel, { color: COLORS.textSecondary }, globalStyles.text]}>
                    {t("profile.stats.gardens")}
                  </Text>
                </View>
                <View style={[styles.statItem, { backgroundColor: COLORS.card }]}>
                  <Text style={[styles.statValue, { color: COLORS.primary }, globalStyles.text]}>2</Text>
                  <Text style={[styles.statLabel, { color: COLORS.textSecondary }, globalStyles.text]}>
                    {t("profile.stats.groups")}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <View style={styles.editNameContainer}>
              <TextInput
                style={[styles.input, styles.nameInput, { borderColor: COLORS.border, color: COLORS.text }]}
                value={editedProfile.name}
                onChangeText={(text) => handleChange("name", text)}
                placeholder={t("profile.fields.namePlaceholder")}
                placeholderTextColor={COLORS.textSecondary}
              />
              <TextInput
                style={[styles.input, styles.emailInput, { borderColor: COLORS.border, color: COLORS.text }]}
                value={editedProfile.email}
                onChangeText={(text) => handleChange("email", text)}
                placeholder={t("profile.fields.emailPlaceholder")}
                placeholderTextColor={COLORS.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          )}
        </View>

        <View style={[styles.card, { backgroundColor: COLORS.card }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: COLORS.text }, globalStyles.text]}>
              {t("profile.personalInfo")}
            </Text>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Ionicons name="call" size={20} color={COLORS.primary} />
                <Text style={[styles.infoLabel, { color: COLORS.textSecondary }, globalStyles.text]}>
                  {t("profile.fields.phone")}
                </Text>
              </View>
              {!isEditing ? (
                <Text style={[styles.infoValue, { color: COLORS.text }, globalStyles.text]}>{profile.phone}</Text>
              ) : (
                <TextInput
                  style={[styles.input, { borderColor: COLORS.border, color: COLORS.text }]}
                  value={editedProfile.phone}
                  onChangeText={(text) => handleChange("phone", text)}
                  placeholder={t("profile.fields.phonePlaceholder")}
                  placeholderTextColor={COLORS.textSecondary}
                  keyboardType="phone-pad"
                />
              )}
            </View>

            <View style={[styles.divider, { backgroundColor: COLORS.border }]} />

            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Ionicons name="location" size={20} color={COLORS.primary} />
                <Text style={[styles.infoLabel, { color: COLORS.textSecondary }, globalStyles.text]}>
                  {t("profile.fields.location")}
                </Text>
              </View>
              {!isEditing ? (
                <Text style={[styles.infoValue, { color: COLORS.text }, globalStyles.text]}>{profile.location}</Text>
              ) : (
                <TextInput
                  style={[styles.input, { borderColor: COLORS.border, color: COLORS.text }]}
                  value={editedProfile.location}
                  onChangeText={(text) => handleChange("location", text)}
                  placeholder={t("profile.fields.locationPlaceholder")}
                  placeholderTextColor={COLORS.textSecondary}
                />
              )}
            </View>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: COLORS.card }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: COLORS.text }, globalStyles.text]}>{t("profile.about")}</Text>
          </View>

          {!isEditing ? (
            <Text style={[styles.bioText, { color: COLORS.text }, globalStyles.text]}>{profile.bio}</Text>
          ) : (
            <TextInput
              style={[styles.bioInput, { borderColor: COLORS.border, color: COLORS.text }]}
              value={editedProfile.bio}
              onChangeText={(text) => handleChange("bio", text)}
              placeholder={t("profile.fields.bioPlaceholder")}
              placeholderTextColor={COLORS.textSecondary}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          )}
        </View>

        {isEditing && (
          <TouchableOpacity
            style={[styles.cancelButton, { borderColor: COLORS.danger, backgroundColor: `${COLORS.danger}10` }]}
            onPress={handleCancel}
          >
            <Text style={[styles.cancelButtonText, { color: COLORS.danger }, globalStyles.text]}>
              {t("profile.cancel")}
            </Text>
          </TouchableOpacity>
        )}

        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "transparent",
  },
  editButtonText: {
    fontSize: 17,
    fontWeight: "500",
    marginLeft: 4,
  },
  profileHeader: {
    alignItems: "center",
    marginVertical: 24,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "bold",
  },
  changeAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  statItem: {
    width: "30%",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  editNameContainer: {
    width: "80%",
  },
  nameInput: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },
  emailInput: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
  },
  cardHeader: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  infoRow: {
    marginVertical: 12,
  },
  infoLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    marginLeft: 8,
  },
  infoValue: {
    fontSize: 16,
  },
  divider: {
    height: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  bioText: {
    padding: 16,
    fontSize: 16,
    lineHeight: 24,
  },
  bioInput: {
    margin: 16,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    height: 100,
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomPadding: {
    height: 40,
  },
})

export default ProfileScreen

