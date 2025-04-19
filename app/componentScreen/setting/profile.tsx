"use client"

import { useThemeColors } from "@/app/utils/colors"
import { globalStyles } from "@/app/utils/Fonts"
import { Ionicons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useTranslation } from "react-i18next"
import { useLanguage } from "@/app/context/LanguageContext"

interface UserProfile {
  name: string
  email: string
  avatar?: string
}

export default function Profile() {
  const [user] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
  })

  const COLORS: any = useThemeColors("dark")
  const { t } = useTranslation()
  const { language } = useLanguage()

  useEffect(() => {
    console.log("ProfileComponent:", language)
  }, [language])

  const handleNavigateToProfile = (): void => {
    Alert.alert("Navigate", t("settings.account.navigation.profile"))
  }

  const handleNavigateToUpdatePassword = (): void => {
    Alert.alert("Navigate", t("settings.account.navigation.updatePassword"))
  }

  return (
    <View style={[styles.card, { backgroundColor: COLORS.card }]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { color: COLORS.text }, globalStyles.text]}>{t("settings.account.title")}</Text>
      </View>

      <TouchableOpacity style={styles.accountRow} onPress={handleNavigateToProfile} activeOpacity={0.7}>
        <View style={styles.accountDetails}>
          <View style={[styles.avatar, { backgroundColor: `${COLORS.primary}20` }]}>
            <Ionicons name="person" size={20} color={COLORS.primary} />
          </View>
          <View>
            <Text style={[styles.accountName, { color: COLORS.text }, globalStyles.text]}>{user.name}</Text>
            <Text style={[styles.accountEmail, { color: COLORS.textSecondary }, globalStyles.text]}>{user.email}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
      </TouchableOpacity>

      <View style={[styles.divider, { backgroundColor: COLORS.border }]} />

      <TouchableOpacity style={styles.settingRow} onPress={handleNavigateToUpdatePassword} activeOpacity={0.7}>
        <View style={styles.rowContent}>
          <Ionicons name="lock-closed" size={20} color={COLORS.primary} />
          <Text style={[styles.settingLabel, { color: COLORS.text }, globalStyles.text]}>
            {t("settings.account.updatePassword")}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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
  divider: {
    height: 1,
  },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  accountDetails: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  accountName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  accountEmail: {
    fontSize: 14,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
})

