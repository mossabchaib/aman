"use client"

import { useThemeColors } from "@/app/utils/colors"
import { globalStyles } from "@/app/utils/Fonts"
import { Ionicons } from "@expo/vector-icons"
import { useEffect } from "react"
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native"
import { useTranslation } from "react-i18next"
import { useLanguage } from "@/app/context/LanguageContext"

export default function Logout() {
  const COLORS: any = useThemeColors("light")
  const { t } = useTranslation()
  const { language } = useLanguage()

  useEffect(() => {
    console.log("LogoutComponent:", language)
  }, [language])

  const handleLogout = (): void => {
    Alert.alert(t("settings.logout.alert.title"), t("settings.logout.alert.message"), [
      {
        text: t("settings.logout.alert.cancel"),
        style: "cancel",
      },
      {
        text: t("settings.logout.alert.confirm"),
        onPress: () =>
          Alert.alert(t("settings.logout.alert.success.title"), t("settings.logout.alert.success.message")),
        style: "destructive",
      },
    ])
  }

  return (
    <TouchableOpacity
      style={[styles.logoutButton, { borderColor: COLORS.danger, backgroundColor: `${COLORS.danger}10` }]}
      onPress={handleLogout}
      activeOpacity={0.7}
    >
      <Ionicons name="log-out" size={18} color={COLORS.danger} />
      <Text style={[styles.logoutText, { color: COLORS.danger }, globalStyles.text]}>
        {t("settings.logout.button")}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
})

