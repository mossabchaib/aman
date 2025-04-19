"use client"

import { useThemeColors } from "@/app/utils/colors"
import { globalStyles } from "@/app/utils/Fonts"
import { useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import { useLanguage } from "@/app/context/LanguageContext"

export default function Header() {
  const COLORS: any = useThemeColors("dark")
  const { t } = useTranslation()
  const { language } = useLanguage()

  useEffect(() => {
    console.log("HeaderComponent:", language)
  }, [language])

  return (
    <View style={styles.header}>
      <Text style={[styles.title, { color: COLORS.text }, globalStyles.text]}>{t("settings.header.title")}</Text>
      <Text style={[styles.subtitle, { color: COLORS.textSecondary }, globalStyles.text]}>
        {t("settings.header.subtitle")}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
})

