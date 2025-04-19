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
  ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"

import { useTranslation } from "react-i18next"
import { useLanguage } from "@/app/context/LanguageContext"

import i18n from "@/app/utils/i18n" 
import { useThemeColors } from "@/app/utils/colors" 
import { globalStyles } from "@/app/utils/Fonts"
import { getLanguage, getModeScreen } from "@/app/utils/serviceAutorisation"

interface PasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const UpdatePasswordScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  })
  const [errors, setErrors] = useState<Partial<PasswordForm>>({})
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
    console.log("UpdatePasswordScreen:", language)
  }, [language])

  const COLORS = useThemeColors(mode)

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleChange = (field: keyof PasswordForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<PasswordForm> = {}

    // Validate current password
    if (!form.currentPassword) {
      newErrors.currentPassword = t("updatePassword.errors.currentPasswordRequired")
    }

    // Validate new password
    if (!form.newPassword) {
      newErrors.newPassword = t("updatePassword.errors.newPasswordRequired")
    } else if (form.newPassword.length < 8) {
      newErrors.newPassword = t("updatePassword.errors.passwordLength")
    }

    // Validate confirm password
    if (!form.confirmPassword) {
      newErrors.confirmPassword = t("updatePassword.errors.confirmPasswordRequired")
    } else if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = t("updatePassword.errors.passwordsDoNotMatch")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      Alert.alert(t("updatePassword.success.title"), t("updatePassword.success.message"), [
        {
          text: t("updatePassword.success.ok"),
          onPress: () => {
            // Reset form
            setForm({
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            })
            // Navigate back
            handleGoBack()
          },
        },
      ])
    }, 1500)
  }

  const handleGoBack = () => {
    Alert.alert(t("updatePassword.goBack.title"), t("updatePassword.goBack.message"))
  }

  const getPasswordStrength = (password: string): { strength: string; color: string } => {
    if (!password) return { strength: t("updatePassword.strength.none"), color: COLORS.textSecondary }

    if (password.length < 8) {
      return { strength: t("updatePassword.strength.weak"), color: COLORS.danger }
    }

    const hasUpperCase:any = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    const strength = hasUpperCase + hasLowerCase + hasNumbers + hasSpecialChars

    if (password.length >= 8) {
      if (strength === 4) return { strength: t("updatePassword.strength.strong"), color: COLORS.success }
      if (strength === 3) return { strength: t("updatePassword.strength.good"), color: COLORS.primary }
      if (strength === 2) return { strength: t("updatePassword.strength.fair"), color: COLORS.warning }
      return { strength: t("updatePassword.strength.weak"), color: COLORS.danger }
    }

    return { strength: t("updatePassword.strength.weak"), color: COLORS.danger }
  }

  const passwordStrength = getPasswordStrength(form.newPassword)

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle={mode === "dark" ? "light-content" : "dark-content"} />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: COLORS.text }, globalStyles.text]}>
          {t("updatePassword.header")}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={[styles.container, { backgroundColor: COLORS.background }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={24} color={COLORS.info} style={styles.infoIcon} />
          <Text style={[styles.infoText, { color: COLORS.text }, globalStyles.text]}>{t("updatePassword.info")}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: COLORS.card }]}>
          {/* Current Password */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: COLORS.text }, globalStyles.text]}>
              {t("updatePassword.currentPassword")}
            </Text>
            <View
              style={[styles.inputContainer, { borderColor: errors.currentPassword ? COLORS.danger : COLORS.border }]}
            >
              <TextInput
                style={[styles.input, { color: COLORS.text }]}
                value={form.currentPassword}
                onChangeText={(text) => handleChange("currentPassword", text)}
                secureTextEntry={!showPasswords.currentPassword}
                placeholder={t("updatePassword.placeholders.currentPassword")}
                placeholderTextColor={COLORS.textSecondary}
              />
              <TouchableOpacity onPress={() => togglePasswordVisibility("currentPassword")} style={styles.eyeIcon}>
                <Ionicons
                  name={showPasswords.currentPassword ? "eye-off" : "eye"}
                  size={20}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            </View>
            {errors.currentPassword && (
              <Text style={[styles.errorText, { color: COLORS.danger }, globalStyles.text]}>
                {errors.currentPassword}
              </Text>
            )}
          </View>

          {/* New Password */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: COLORS.text }, globalStyles.text]}>
              {t("updatePassword.newPassword")}
            </Text>
            <View style={[styles.inputContainer, { borderColor: errors.newPassword ? COLORS.danger : COLORS.border }]}>
              <TextInput
                style={[styles.input, { color: COLORS.text }]}
                value={form.newPassword}
                onChangeText={(text) => handleChange("newPassword", text)}
                secureTextEntry={!showPasswords.newPassword}
                placeholder={t("updatePassword.placeholders.newPassword")}
                placeholderTextColor={COLORS.textSecondary}
              />
              <TouchableOpacity onPress={() => togglePasswordVisibility("newPassword")} style={styles.eyeIcon}>
                <Ionicons name={showPasswords.newPassword ? "eye-off" : "eye"} size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>
            {errors.newPassword ? (
              <Text style={[styles.errorText, { color: COLORS.danger }, globalStyles.text]}>{errors.newPassword}</Text>
            ) : form.newPassword ? (
              <View style={styles.strengthContainer}>
                <Text style={[styles.strengthLabel, { color: COLORS.textSecondary }, globalStyles.text]}>
                  {t("updatePassword.strength.label")}
                </Text>
                <Text style={[styles.strengthValue, { color: passwordStrength.color }, globalStyles.text]}>
                  {passwordStrength.strength}
                </Text>
              </View>
            ) : null}
          </View>

          {/* Confirm Password */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: COLORS.text }, globalStyles.text]}>
              {t("updatePassword.confirmPassword")}
            </Text>
            <View
              style={[styles.inputContainer, { borderColor: errors.confirmPassword ? COLORS.danger : COLORS.border }]}
            >
              <TextInput
                style={[styles.input, { color: COLORS.text }]}
                value={form.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
                secureTextEntry={!showPasswords.confirmPassword}
                placeholder={t("updatePassword.placeholders.confirmPassword")}
                placeholderTextColor={COLORS.textSecondary}
              />
              <TouchableOpacity onPress={() => togglePasswordVisibility("confirmPassword")} style={styles.eyeIcon}>
                <Ionicons
                  name={showPasswords.confirmPassword ? "eye-off" : "eye"}
                  size={20}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text style={[styles.errorText, { color: COLORS.danger }, globalStyles.text]}>
                {errors.confirmPassword}
              </Text>
            )}
          </View>
        </View>

        {/* Update Button */}
        <TouchableOpacity
          style={[styles.updateButton, { backgroundColor: COLORS.primary }, isLoading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={[styles.updateButtonText, globalStyles.text]}>{t("updatePassword.buttons.update")}</Text>
          )}
        </TouchableOpacity>

        {/* Forgot Password Link */}
        <TouchableOpacity
          style={styles.forgotPasswordLink}
          onPress={() =>
            Alert.alert(t("updatePassword.forgotPassword.title"), t("updatePassword.forgotPassword.message"))
          }
        >
          <Text style={[styles.forgotPasswordText, { color: COLORS.primary }, globalStyles.text]}>
            {t("updatePassword.forgotPassword.link")}
          </Text>
        </TouchableOpacity>

        {/* Bottom Padding */}
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
    fontSize: 18,
    fontWeight: "bold",
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: "flex-start",
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 12,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  strengthContainer: {
    flexDirection: "row",
    marginTop: 4,
  },
  strengthLabel: {
    fontSize: 12,
    marginRight: 4,
  },
  strengthValue: {
    fontSize: 12,
    fontWeight: "500",
  },
  updateButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  disabledButton: {
    opacity: 0.7,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPasswordLink: {
    alignItems: "center",
    padding: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  bottomPadding: {
    height: 40,
  },
})

export default UpdatePasswordScreen

