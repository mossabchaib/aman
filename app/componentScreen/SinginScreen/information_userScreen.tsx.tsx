"use client"

import { useEffect, useState } from "react"
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { FontAwesome } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useLanguage } from "@/app/context/LanguageContext"
import { useTranslation } from "react-i18next"
import { getLanguage, getModeScreen } from "@/app/utils/serviceAutorisation"
import i18n from "@/app/utils/i18n"
import { useThemeColors } from "@/app/utils/colors"

export default function InformationUserScreen() {
  const [firstname, setFirstname] = useState<string>("")
  const [Email, setEmail] = useState<string>("")
  const [signIn, setSignIn] = useState<boolean>(false)
  const [mode, setMode] = useState<"light" | "dark">("light")
  const router = useRouter()
  const { language } = useLanguage()
  const { t } = useTranslation()
  const COLORS = useThemeColors(mode)

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

  const handleContinue = async () => {
    if (signIn) return
    setSignIn(true)
    if (!firstname || !Email) {
      Alert.alert(t("alerts.error"), t("userInfo.fillAllFields"), [{ text: "OK" }])
      setSignIn(false)
      return
    }
    const information = {
      First_name: firstname,
      Laste_name: Email,
    }
    await AsyncStorage.setItem("information", JSON.stringify(information))
    router.push("/screens/emailScreen")
  }

  const handleSignIn = async () => {
    await AsyncStorage.clear()
    router.push("/screens/LoginScreen")
  }

  return (
    <ThemeProvider value={mode === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
        <KeyboardAvoidingView
          style={styles.container2}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <TouchableOpacity style={styles.logo}>
            <Text style={[styles.logoText, { color: COLORS.text }]}>Aman</Text>
          </TouchableOpacity>
          <View style={styles.containerlogo}>
            <Text style={[styles.title, { color: COLORS.text }]}>{t("userInfo.welcome")}</Text>
            <Text style={[styles.subtitle, { color: COLORS.card }]}>{t("userInfo.enterInformation")}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: COLORS.text }]}>{t("userInfo.firstName")}</Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: COLORS.text,
                  backgroundColor: COLORS.inputs,
                },
              ]}
              onChangeText={(text) => setFirstname(text)}
              placeholder={t("userInfo.firstName")}
              placeholderTextColor={COLORS.textSecondary}
            />
            <Text style={[styles.label, { color: COLORS.text }]}>{t("email.emailPlaceholder")}</Text>
            <View style={[styles.inputPasswordContainer, { backgroundColor: COLORS.inputs }]}>
            <TextInput
                         style={[
                           styles.input,
                           {
                             color: COLORS.text,
                             backgroundColor: COLORS.inputs,
                           },
                         ]}
                         onChangeText={(text) => setEmail(text)}
                         placeholder={t("email.emailPlaceholder")}
                         placeholderTextColor={COLORS.textSecondary}
                       />
            </View>
          </View>
          <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.primary }]} onPress={handleContinue}>
            {signIn ? (
              <Text style={styles.buttonText}>
                <FontAwesome name="spinner" size={22} style={{ marginRight: 15 }} />
              </Text>
            ) : (
              <Text style={styles.buttonText}>{t("userInfo.continue")}</Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={{ color: COLORS.textSecondary }}>{t("userInfo.haveAccount")}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 5,
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  containerlogo: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    marginBottom: 35,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "500",
  },
  inputContainer: {
    paddingLeft: 50,
    paddingRight: 50,
    height: 240,
  },
  input: {
    width: 360,
    height: 50,
    marginTop: 15,
    borderRadius: 5,
    paddingLeft: 20,
    fontSize: 15,
    marginBottom: 15,
  },
  inputPassword: {
    width: 300,
    height: 50,
    borderRadius: 5,
    paddingLeft: 20,
    fontSize: 15,
  },
  inputPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 360,
    borderRadius: 5,
    height: 50,
    marginTop: 15,
    paddingRight: 17,
  },
  forgotPassword: {
    marginTop: 15,
    paddingLeft: 215,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    padding: 15,
    width: 350,
    margin: 20,
    borderRadius: 5,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
})

