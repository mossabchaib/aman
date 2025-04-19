"use client"

import { useThemeColors } from "@/app/utils/colors"
import { globalStyles } from "@/app/utils/Fonts"
import { Ionicons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useTranslation } from "react-i18next"
import { useLanguage } from "@/app/context/LanguageContext"

type ThemeOption = "light" | "dark" | "system"

export default function ModeDarkLight() {
  const COLORS: any = useThemeColors("dark")
  const [theme, setTheme] = useState<ThemeOption>("light")
  const { t } = useTranslation()
  const { language } = useLanguage()

  useEffect(() => {
    console.log("ThemeComponent:", language)
  }, [language])

  const handleThemeChange = (newTheme: ThemeOption): void => {
    setTheme(newTheme)
    Alert.alert(
      t("settings.appearance.alert.title"),
      t("settings.appearance.alert.message", { theme: t(`settings.appearance.options.${newTheme}`) }),
    )
  }

  return (
    <View style={[{ backgroundColor: COLORS.card }]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { color: COLORS.text }, globalStyles.text]}>
          {t("settings.appearance.title")}
        </Text>
      </View>

      <Text style={[styles.cardDescription, { color: COLORS.textSecondary }, globalStyles.text]}>
        {t("settings.appearance.description")}
      </Text>

      <View style={styles.themeGrid}>
        {(["light", "dark", "system"] as ThemeOption[]).map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.themeOption,
              { borderColor: theme === item ? COLORS.primary : COLORS.border },
              theme === item && styles.selectedTheme,
            ]}
            onPress={() => handleThemeChange(item)}
            activeOpacity={0.7}
          >
            <View style={styles.themeIconContainer}>
              {item === "light" && <Ionicons name="sunny" size={24} color={COLORS.warning} />}
              {item === "dark" && <Ionicons name="moon" size={24} color={COLORS.secondary} />}
              {item === "system" && <Ionicons name="phone-portrait" size={24} color={COLORS.textSecondary} />}
            </View>
            <Text style={[styles.themeLabel, { color: COLORS.text }, globalStyles.text]}>
              {t(`settings.appearance.options.${item}`)}
            </Text>
            {theme === item && (
              <View style={[styles.checkmark, { backgroundColor: COLORS.primary }]}>
                <Ionicons name="checkmark" size={12} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardHeader: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  themeGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  themeOption: {
    width: "31%",
    aspectRatio: 0.9,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  selectedTheme: {
    borderWidth: 2,
  },
  themeIconContainer: {
    marginBottom: 12,
  },
  themeLabel: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
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

