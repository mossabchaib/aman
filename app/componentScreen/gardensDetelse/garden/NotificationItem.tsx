"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface NotificationItemProps {
  title: string
  description: string
  enabled: boolean
  onToggle?: () => void
  colors: any
}

const NotificationItem = ({ title, description, enabled: initialEnabled, onToggle, colors }: NotificationItemProps) => {
  const [enabled, setEnabled] = useState(initialEnabled)

  const handleToggle = async () => {
    const newState = !enabled
    setEnabled(newState)

    try {
      // Save notification state
      await AsyncStorage.setItem("autorisationnotification", newState ? "true" : "")

      // Call parent callback if provided
      if (onToggle) {
        onToggle()
      }
    } catch (error) {
      console.error("Error saving notification state:", error)
    }
  }

  return (
    <View style={styles.notificationItem}>
      <View>
        <Text style={[styles.notificationTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.notificationDesc, { color: colors.textSecondary }]}>{description}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.toggleSwitch,
          {
            backgroundColor: enabled ? colors.primary : colors.muted,
            borderColor: enabled ? colors.primary : colors.border,
          },
        ]}
        onPress={handleToggle}
      >
        <View
          style={[
            styles.toggleSwitchKnob,
            {
              backgroundColor: enabled ? "#fff" : colors.text,
              transform: [{ translateX: enabled ? 16 : 2 }],
            },
          ]}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  notificationTitle: {
    fontWeight: "500",
    marginBottom: 4,
  },
  notificationDesc: {
    fontSize: 12,
  },
  toggleSwitch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    padding: 2,
  },
  toggleSwitchKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
})

export default NotificationItem

