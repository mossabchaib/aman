"use client"

import Card from "@/app/components/Card/Card"
import { useLanguage } from "@/app/context/LanguageContext"
import { useThemeColors } from "@/app/utils/colors"
import { globalStyles } from "@/app/utils/Fonts"
import { Ionicons } from "@expo/vector-icons"
import React, { useEffect, useState } from "react"
import { Alert, Platform, StyleSheet, Switch, Text, View } from "react-native"
import { useTranslation } from "react-i18next"

interface NotificationSettings {
  appNotifications: boolean
  emailNotifications: boolean
  wateringReminders: boolean
  moistureAlerts: boolean
  temperatureAlerts: boolean
}

interface NotificationItem {
  key: keyof NotificationSettings
  icon: string
}

export default function Autoriasation() {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    appNotifications: true,
    emailNotifications: false,
    wateringReminders: true,
    moistureAlerts: true,
    temperatureAlerts: false,
  })

  const { language } = useLanguage()
  const { t } = useTranslation()

  useEffect(() => {
    console.log("SettingsScreen:", language)
  }, [language])

  const notificationItems: NotificationItem[] = [
    {
      key: "appNotifications",
      icon: "notifications",
    },
    {
      key: "emailNotifications",
      icon: "mail",
    },
    {
      key: "wateringReminders",
      icon: "water",
    },
    {
      key: "moistureAlerts",
      icon: "water-outline",
    },
    {
      key: "temperatureAlerts",
      icon: "thermometer",
    },
  ]

  const handleToggleNotification = (key: keyof NotificationSettings): void => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))

    const isEnabled = !notifications[key]
    const notificationName = t(`settings.notifications.items.${key}.label`)
    const status = isEnabled ? t("settings.notifications.alerts.enabled") : t("settings.notifications.alerts.disabled")
    const message = t("settings.notifications.alerts.message", {
      name: notificationName,
      status: isEnabled ? t("enabled") : t("disabled"),
    })

    Alert.alert(
      isEnabled ? t("settings.notifications.alerts.enabled") : t("settings.notifications.alerts.disabled"),
      message,
    )
  }

  const COLORS: any = useThemeColors("dark")

  return (
    <>
      <Card style={{ backgroundColor: COLORS.card }}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: COLORS.text }, globalStyles.text]}>
            {t("settings.notifications.title")}
          </Text>
        </View>
        <Text style={[styles.cardDescription, { color: COLORS.textSecondary }, globalStyles.text]}>
          {t("settings.notifications.description")}
        </Text>
        {notificationItems.map((item, index) => (
          <React.Fragment key={item.key}>
            <View style={styles.notificationRow}>
              <View style={styles.notificationContent}>
                <View style={styles.notificationIconContainer}>
                  <Ionicons name={item.icon as any} size={20} color={COLORS.primary} />
                </View>
                <View style={styles.notificationTextContainer}>
                  <Text style={[styles.notificationLabel, { color: COLORS.text }, globalStyles.text]}>
                    {t(`settings.notifications.items.${item.key}.label`)}
                  </Text>
                  <Text style={[styles.notificationDescription, { color: COLORS.textSecondary }, globalStyles.text]}>
                    {t(`settings.notifications.items.${item.key}.description`)}
                  </Text>
                </View>
              </View>
              <Switch
                value={notifications[item.key]}
                onValueChange={() => handleToggleNotification(item.key)}
                trackColor={{ false: "#d1d5db", true: COLORS.primary }}
                thumbColor={Platform.OS === "ios" ? "#fff" : notifications[item.key] ? COLORS.primary : "#f4f3f4"}
                ios_backgroundColor="#d1d5db"
              />
            </View>
            {index < notificationItems.length - 1 && (
              <View style={[styles.divider, { backgroundColor: COLORS.border, marginLeft: 56 }]} />
            )}
          </React.Fragment>
        ))}
      </Card>
    </>
  )
}

const styles = StyleSheet.create({
  cardHeader: { padding: 16 },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardDescription: { fontSize: 14, paddingHorizontal: 16, marginBottom: 12 },
  divider: { height: 1 },
  notificationRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16 },
  notificationContent: { flexDirection: "row", flex: 1, marginRight: 16 },
  notificationIconContainer: { width: 24, alignItems: "center", marginRight: 16 },
  notificationTextContainer: { flex: 1 },
  notificationLabel: { fontSize: 16, fontWeight: "500", marginBottom: 4 },
  notificationDescription: { fontSize: 14 },
})

