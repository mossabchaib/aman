import Card from '@/app/components/Card/Card';
import { useThemeColors } from '@/app/utils/colors';
import { globalStyles } from '@/app/utils/Fonts';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next'; // إضافة useTranslation

export default function Notification({ filteredNotifications, activeTab,mode }: any) {
  const color: any = useThemeColors(mode||"light");
  const { t } = useTranslation(); 

  const getNotificationColor = (type: any) => {
    switch (type) {
      case "temperature":
        return "#f97316"; // Orange
      case "ph":
        return "#f59e0b"; // Amber
      case "water":
        return "#3b82f6"; // Blue
      case "wifi":
        return "#8b5cf6"; // Purple
      case "harvest":
        return "#10b981"; // Green
      case "system":
        return "#6b7280"; // Gray
      default:
        return "#ef4444"; // Red
    }
  };

  const getNotificationIcon = (type: any) => {
    switch (type) {
      case "temperature":
        return "thermometer-outline";
      case "ph":
        return "analytics-outline";
      case "water":
        return "water-outline";
      case "wifi":
        return "wifi-outline";
      case "harvest":
        return "leaf-outline";
      case "system":
        return "cog-outline";
      default:
        return "alert-circle-outline";
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      {filteredNotifications.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons
            name={activeTab === "unread" ? "checkmark-circle" : "notifications-off"}
            size={64}
            color={color.textSecondary}
          />
          <Text style={[styles.emptyStateTitle, { color: color.text }, globalStyles.text]}>
            {activeTab === "unread" ? t('notification.allCaughtUp') : t('notification.noNotifications')}
          </Text>
          <Text style={[styles.emptyStateDescription, { color: color.textSecondary }, globalStyles.text]}>
            {activeTab === "unread"
              ? t('notification.allRead')
              : t('notification.noNotificationsYet')}
          </Text>
        </View>
      ) : (
        <Card style={styles.notificationsCard}>
          {filteredNotifications.map((notification: any) => (
            <View key={notification.id}>
              <View
                style={[
                  styles.notificationItem,
                  notification.read ? styles.readNotification : styles.unreadNotification,
                  { borderLeftColor: notification.read ? "transparent" : color.primary },
                ]}
              >
                <View
                  style={[
                    styles.notificationIcon,
                    { backgroundColor: `${getNotificationColor(notification.type)}20` },
                  ]}
                >
                  <Ionicons
                    name={getNotificationIcon(notification.type)}
                    size={20}
                    color={getNotificationColor(notification.type)}
                  />
                </View>

                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <Text style={[styles.notificationTitle, { color: color.text }, globalStyles.text]}>
                      {notification.title}
                    </Text>
                    <Text style={[styles.notificationTime, { color: color.textSecondary }, globalStyles.text]}>
                      {notification.time}
                    </Text>
                  </View>

                  <Text style={[styles.notificationMessage, { color: color.textSecondary }, globalStyles.text]}>
                    {notification.message}
                  </Text>

                  {notification.garden && (
                    <View style={styles.notificationGarden}>
                      <Ionicons name="leaf" size={12} color={color.primary} style={styles.gardenIcon} />
                      <Text style={[styles.gardenName, { color: color.primary }, globalStyles.text]}>
                        {notification.garden}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {filteredNotifications.indexOf(notification) < filteredNotifications.length - 1 && (
                <View style={[styles.divider, { backgroundColor: color.border }]} />
              )}
            </View>
          ))}
        </Card>
      )}

      {/* Bottom padding for tab bar */}
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    textAlign: "center",
  },
  notificationsCard: {
    padding: 0,
    overflow: "hidden",
  },
  notificationItem: {
    flexDirection: "row",
    padding: 16,
    borderLeftWidth: 3,
  },
  readNotification: {
    opacity: 0.8,
  },
  unreadNotification: {
    backgroundColor: "rgba(16, 185, 129, 0.05)",
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  notificationTime: {
    fontSize: 12,
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    marginBottom: 4,
  },
  notificationGarden: {
    flexDirection: "row",
    alignItems: "center",
  },
  gardenIcon: {
    marginRight: 4,
  },
  gardenName: {
    fontSize: 12,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    width: "100%",
  },
});