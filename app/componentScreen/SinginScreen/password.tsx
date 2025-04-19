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
import { FontAwesome5 } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { Link } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useLanguage } from "@/app/context/LanguageContext"
import { useTranslation } from "react-i18next"
import { getLanguage, getModeScreen } from "@/app/utils/serviceAutorisation"
import i18n from "@/app/utils/i18n"
import { useThemeColors } from "@/app/utils/colors"

export default function Password() {
  const [password, setPassword] = useState("")
  const [confirme_password, setConfirmePassword] = useState("")
  const [seePassword, setSeePassword] = useState(true)
  const [signIn, setSignIn] = useState(false)
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

  const handleSignIn = async () => {
    if (!confirme_password || !password) {
      Alert.alert(t("alerts.error"), t("userInfo.fillAllFields"), [{ text: "OK" }])
      return
    }

    if (confirme_password !== password) {
      Alert.alert(t("alerts.error"), t("password.passwordsDoNotMatch"), [{ text: "OK" }])
      return
    }

    const data = await AsyncStorage.getItem("information")
    if (!data) {
      Alert.alert(t("alerts.error"), "Something went wrong", [{ text: "OK" }])
      return
    }

    const parsedData = JSON.parse(data)
    const updatedData = {
      First_name: parsedData.First_name,
      Last_name: parsedData.Laste_name,
      Year: parsedData.Year,
      Month: parsedData.Month,
      Day: parsedData.Day,
      password: password,
    }

    await AsyncStorage.setItem("information", JSON.stringify(updatedData))
    setSignIn(true)
    router.push("/Sign_in_or_Log_in/Log_in/email")
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
            <Text style={[styles.logoText, { color: COLORS.text }]}>{t("password.title")}</Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <View style={[styles.inputPasswordContainer, { backgroundColor: COLORS.inputs }]}>
              <TextInput
                style={[
                  styles.inputPassword,
                  {
                    color: COLORS.text,
                  },
                ]}
                onChangeText={(text) => setPassword(text)}
                placeholder={t("password.passwordPlaceholder")}
                value={password.toString()}
                secureTextEntry={seePassword}
                placeholderTextColor={COLORS.textSecondary}
              />
              <TouchableOpacity onPress={() => setSeePassword(!seePassword)} style={{ marginRight: 10 }}>
                {seePassword ? (
                  <FontAwesome name="eye-slash" size={24} color={COLORS.text} />
                ) : (
                  <FontAwesome5 name="eye" size={24} color={COLORS.text} />
                )}
              </TouchableOpacity>
            </View>
            <View style={[styles.inputPasswordContainer, { backgroundColor: COLORS.inputs }]}>
              <TextInput
                style={[
                  styles.inputPassword,
                  {
                    color: COLORS.text,
                  },
                ]}
                onChangeText={(text) => setConfirmePassword(text)}
                placeholder={t("password.confirmPasswordPlaceholder")}
                value={confirme_password.toString()}
                secureTextEntry={seePassword}
                placeholderTextColor={COLORS.textSecondary}
              />
              <TouchableOpacity onPress={() => setSeePassword(!seePassword)} style={{ marginRight: 10 }}>
                {seePassword ? (
                  <FontAwesome name="eye-slash" size={24} color={COLORS.text} />
                ) : (
                  <FontAwesome5 name="eye" size={24} color={COLORS.text} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.primary }]} onPress={handleSignIn}>
            {signIn ? (
              <Text style={styles.buttonText}>
                <FontAwesome name="spinner" size={22} style={{ marginRight: 15 }} />
              </Text>
            ) : (
              <Text style={styles.buttonText}>{t("password.next")}</Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <Link href="/Sign_in_or_Log_in/Log_in/email">
          <Text
            style={{
              color: COLORS.secondary,
            }}
          >
            {t("password.signIn")}
          </Text>
        </Link>
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
  container2: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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
    height: 200,
  },
  input: {
    width: 360,
    height: 50,
    marginTop: 15,
    borderRadius: 5,
    paddingLeft: 20,
    fontSize: 15,
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
    color: "#fff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  or: {
    flexDirection: "row",
    width: 300,
    alignItems: "center",
    justifyContent: "space-between",
  },
  login: {
    flexDirection: "row",
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  Line: {
    width: 120,
    height: 3,
    backgroundColor: "#ffffff0d",
    marginLeft: 10,
    marginRight: 20,
  },
  imageReseau: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginRight: 15,
  },
})

