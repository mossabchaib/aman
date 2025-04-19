import { useThemeColors } from '@/app/utils/colors';
import { Ionicons } from '@expo/vector-icons'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
function ResentNotification ({alerts}:any) {
    const color:any=useThemeColors;
    const getAlertColor = (type:any) => {
        switch (type) {
          case "temperature":
            return "#f97316" // Orange
          case "ph":
            return "#f59e0b" // Amber
          case "water":
            return "#3b82f6" // Blue
          default:
            return "#ef4444" // Red
        }
      }
      const getAlertIcon = (type:any) => {
        switch (type) {
          case "temperature":
            return "thermometer-outline"
          case "ph":
            return "analytics-outline"
          case "water":
            return "water-outline"
          default:
            return "alert-circle-outline"
        }
      }
    return (
     <>
      <View style={styles.sectionHeader}>
               <Text style={[styles.sectionTitle, { color: color().text }]}>Recent Alerts</Text>
             </View>
     {alerts.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="checkmark-circle-outline" size={48} color={color().success} />
              <Text style={[styles.emptyStateText, { color: color().text }]}>All systems normal</Text>
              <Text style={[styles.emptyStateSubtext, { color: color().textSecondary }]}>
                No alerts to display at this time
              </Text>
            </View>
          ) : (
            alerts.slice(0, 3).map((alert:any) => (
                <>
              <View
                key={alert.id}
                style={[
                  styles.alertItem,
                //   { backgroundColor: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)" },
                ]}
              >
                <View style={[styles.alertIcon, { backgroundColor: `${getAlertColor(alert.type)}20` }]}>
                  <Ionicons name={getAlertIcon(alert.type)} size={16} color={getAlertColor(alert.type)} />
                </View>
                <View style={styles.alertContent}>
                  <Text style={[styles.alertTitle, { color: color().text }]}>{alert.message}</Text>
                  <Text style={[styles.alertTime, { color: color().textSecondary }]}>
                    {alert.time} • {alert.garden}
                  </Text>
                </View>
              </View>
              <View style={styles.line}></View>
              </>
            ))
          )}
          </>
    )
}

export default ResentNotification
const styles = StyleSheet.create({
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        borderBottomColor: "rgb(0, 0, 0)",
      },
      emptyStateText: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 12,
        marginBottom: 4,
      },
      emptyStateSubtext: {
        fontSize: 14,
        textAlign: "center",
      },
      alertItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
      },
      alertIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
      },
      alertContent: {
        flex: 1,
      },
      alertTitle: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 2,
      },
      alertTime: {
        fontSize: 12,
      },
      line:{
        width:"100%",
        height:2,
        backgroundColor: "rgba(0, 0, 0, 0.06)",

      },
      sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
        marginTop: 8,
      },
      sectionTitle: {
        fontSize: 23,
        fontWeight: "500",
      },
})