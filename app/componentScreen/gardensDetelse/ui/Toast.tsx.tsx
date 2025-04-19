import { View, Text, StyleSheet, I18nManager } from "react-native"

interface ToastProps {
  message: string
  colors: any
}

const Toast = ({ message, colors }: ToastProps) => {
  return (
    <View
      style={[
        styles.toast,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        },
        I18nManager.isRTL && styles.rtlToast,
      ]}
    >
      <Text style={{ color: colors.text, textAlign: I18nManager.isRTL ? "right" : "left" }}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
  },
  rtlToast: {
    alignItems: "flex-end",
  },
})

export default Toast

