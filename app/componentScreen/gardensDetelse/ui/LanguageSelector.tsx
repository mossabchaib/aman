import { View, Text, TouchableOpacity, StyleSheet, I18nManager } from "react-native"
import { useTranslation } from "react-i18next"
import AsyncStorage from "@react-native-async-storage/async-storage"
import i18n from "@/app/utils/i18n" 

interface LanguageSelectorProps {
  colors: any
}

const LanguageSelector = ({ colors }: LanguageSelectorProps) => {
  const { t } = useTranslation()

  const changeLanguage = async (lang: string) => {
    try {
      await AsyncStorage.setItem("language", lang)

      // Handle RTL for Arabic
      const isRTL = lang === "ar"
      if (isRTL !== I18nManager.isRTL) {
        I18nManager.forceRTL(isRTL)
        // This requires a reload to take effect
        // In a real app, you might want to restart the app here
      }

      i18n.changeLanguage(lang)
    } catch (error) {
      console.error("Error changing language:", error)
    }
  }

  return (
    <View
      style={[
        styles.languageSelector,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          left: I18nManager.isRTL ? undefined : 20,
          right: I18nManager.isRTL ? 20 : undefined,
        },
      ]}
    >
      <TouchableOpacity
        style={[styles.languageButton, i18n.language === "en" && { backgroundColor: colors.primary + "30" }]}
        onPress={() => changeLanguage("en")}
      >
        <Text
          style={{
            color: i18n.language === "en" ? colors.primary : colors.text,
          }}
        >
          EN
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.languageButton, i18n.language === "fr" && { backgroundColor: colors.primary + "30" }]}
        onPress={() => changeLanguage("fr")}
      >
        <Text
          style={{
            color: i18n.language === "fr" ? colors.primary : colors.text,
          }}
        >
          FR
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.languageButton, i18n.language === "ar" && { backgroundColor: colors.primary + "30" }]}
        onPress={() => changeLanguage("ar")}
      >
        <Text
          style={{
            color: i18n.language === "ar" ? colors.primary : colors.text,
          }}
        >
          AR
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  languageSelector: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
  },
  languageButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
})

export default LanguageSelector

