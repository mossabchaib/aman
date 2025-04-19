import { TouchableOpacity, StyleSheet, I18nManager } from "react-native"
import { Feather } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface ThemeToggleProps {
  mode: "light" | "dark"
  setMode: (mode: "light" | "dark") => void
  colors: any
}

const ThemeToggle = ({ mode, setMode, colors }: ThemeToggleProps) => {
  const toggleTheme = async () => {
    const newMode = mode === "light" ? "dark" : "light"
    setMode(newMode)
    try {
      await AsyncStorage.setItem("mode", newMode)
    } catch (error) {
      console.error("Error saving theme mode:", error)
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.themeToggle,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          right: I18nManager.isRTL ? undefined : 20,
          left: I18nManager.isRTL ? 20 : undefined,
        },
      ]}
      onPress={toggleTheme}
    >
      <Feather name={mode === "light" ? "moon" : "sun"} size={16} color={colors.text} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  themeToggle: {
    position: "absolute",
    bottom: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
})

export default ThemeToggle

