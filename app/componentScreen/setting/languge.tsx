"use client"

import Card from "@/app/components/Card/Card"
import { useThemeColors } from "@/app/utils/colors"
import { globalStyles } from "@/app/utils/Fonts"
import { Ionicons } from "@expo/vector-icons"
import { useEffect } from "react"
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useLanguage } from "@/app/context/LanguageContext"
import { useTranslation } from "react-i18next"

type LanguageOption = "english" | "french" | "arabic"

export default function Language() {
  const languageOptions = [
    { key: "english" as LanguageOption, nativeName: "English", flag: "🇺🇸" },
    { key: "french" as LanguageOption, nativeName: "Français", flag: "🇫🇷" },
    { key: "arabic" as LanguageOption, nativeName: "العربية", flag: "🇸🇦" },
  ]

  const COLORS: any = useThemeColors("dark")
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslation()

  useEffect(() => {
    console.log("LanguageComponent:", language)
  }, [language])

  const handleLanguageChange = (newLanguage: LanguageOption): void => {
    setLanguage(newLanguage)
    Alert.alert(
      t("settings.language.alert.title"),
      t("settings.language.alert.message", { language: t(`settings.language.options.${newLanguage}`) }),
    )
  }

  return (
    <Card style={[{ backgroundColor: COLORS.card }]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { color: COLORS.text }, globalStyles.text]}>
          {t("settings.language.title")}
        </Text>
      </View>

      <Text style={[styles.cardDescription, { color: COLORS.textSecondary }, globalStyles.text]}>
        {t("settings.language.description")}
      </Text>

      <View style={styles.languageGrid}>
        {languageOptions.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.languageOption,
              { borderColor: language === item.key ? COLORS.primary : COLORS.border },
              language === item.key && styles.selectedLanguage,
            ]}
            onPress={() => handleLanguageChange(item.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.languageFlag, { color: COLORS.text }, globalStyles.text]}>{item.flag}</Text>
            <Text style={[styles.languageLabel, { color: COLORS.text }, globalStyles.text]}>
              {t(`settings.language.options.${item.key}`)}
            </Text>
            {language === item.key && (
              <View style={[styles.checkmark, { backgroundColor: COLORS.primary }]}>
                <Ionicons name="checkmark" size={12} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  cardHeader: { padding: 16 },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardDescription: { fontSize: 14, paddingHorizontal: 16, marginBottom: 12 },
  languageGrid: { flexDirection: "row", justifyContent: "space-between", padding: 16 },
  languageOption: {
    width: "31%",
    aspectRatio: 0.9,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  selectedLanguage: { borderWidth: 2 },
  languageFlag: { fontSize: 24, marginBottom: 8 },
  languageLabel: { fontSize: 14, fontWeight: "500", textAlign: "center" },
  checkmark: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
})

