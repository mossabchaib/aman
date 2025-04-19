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
import { FontAwesome } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { Link } from "expo-router"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import NetInfo from "@react-native-community/netinfo"
import { useLanguage } from "@/app/context/LanguageContext"
import { useTranslation } from "react-i18next"
import { getLanguage, getModeScreen } from "@/app/utils/serviceAutorisation"
import i18n from "@/app/utils/i18n"
import { useThemeColors } from "@/app/utils/colors"

export default function Index() {
  const [firstInput, setFirstInput] = useState("")
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
    if (!firstInput) {
      Alert.alert(t("alerts.error"), t("userInfo.fillAllFields"), [{ text: "OK" }])
      return
    }
    setSignIn(true)
    const data = await AsyncStorage.getItem("information")
    if (!data) {
      Alert.alert(t("alerts.error"), "Something went wrong", [{ text: "OK" }])
      return
    }

    const parsedData = JSON.parse(data)
    const updatedData = {
      First_name: parsedData.First_name,
      Last_name: parsedData.Last_name,
      Year: parsedData.Year,
      Month: parsedData.Month,
      Day: parsedData.Day,
      password: parsedData.password,
      email: firstInput,
    }
    const date = `${parsedData.Year?.toString() || "2024"}-${parsedData.Month?.toString() || "01"}-${parsedData.Day?.toString() || "01"}`

    const netInfo = await NetInfo.fetch()
    if (netInfo.isConnected) {
      console.log("updatedData:", updatedData)
      try {
        const response = await axios.post(`User/users/`, {
          first_name: updatedData.First_name,
          last_name: updatedData.Last_name,
          email: updatedData.email,
          password: updatedData.password,
          role: 2,
          date: "2024-07-25",
          is_verified: false,
          is_superuser: true,
        })

        if (response.status == 201) {
          await AsyncStorage.setItem("id", response.data)
          Alert.alert(t("alerts.success"), "We sent you an OTP in your email.", [{ text: "OK" }])
         
          return
        }
      } catch (error) {
        setSignIn(false)
        Alert.alert("Oops...", `Your data is wrong. Please verify your data or create a new account.`, [{ text: "OK" }])
      }
    } else {
      Alert.alert("Oops...", "Your internet connection is broken.", [{ text: "OK" }])
      setSignIn(false)
    }
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
            <Text style={[styles.logoText, { color: COLORS.text }]}>{t("email.verificationInstructions")}</Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  color: COLORS.text,
                  backgroundColor: COLORS.inputs,
                },
              ]}
              onChangeText={(text) => setFirstInput(text)}
              placeholder={t("email.emailPlaceholder")}
              placeholderTextColor={COLORS.textSecondary}
            />
          </View>
          <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.primary }]} onPress={handleSignIn}>
            {signIn ? (
              <Text style={styles.buttonText}>
                <FontAwesome name="spinner" size={22} style={{ marginRight: 15 }} />
              </Text>
            ) : (
              <Text style={styles.buttonText}>{t("email.verification")}</Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <Link href="/">
          <Text
            style={{
              color: COLORS.secondary,
            }}
          >
            {t("email.signIn")}
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
    fontSize: 15,
    fontWeight: "500",
    padding: 15,
  },
  inputContainer: {
    paddingLeft: 50,
    paddingRight: 50,
    height: 200,
  },
  input: {
    width: 360,
    height: 70,
    marginTop: 15,
    borderRadius: 5,
    paddingLeft: 20,
    fontSize: 15,
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
    marginTop: 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
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

