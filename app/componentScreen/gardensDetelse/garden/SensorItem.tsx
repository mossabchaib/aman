import { View, Text, StyleSheet, I18nManager } from "react-native"
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons"
import { useTranslation } from "react-i18next"

interface SensorItemProps {
  type: "moisture" | "temperature" | "sunlight"
  value: number
  timestamp: string
  colors: any
}

const SensorItem = ({ type, value, timestamp, colors }: SensorItemProps) => {
  const { t } = useTranslation()

  return (
    <View
      style={[
        styles.sensorItem,
        { borderColor: colors.border, backgroundColor: colors.cardBackground },
        I18nManager.isRTL && styles.rtlContainer,
      ]}
    >
      <View style={[styles.sensorItemLeft, I18nManager.isRTL && styles.rtlSensorLeft]}>
        {type === "moisture" && <MaterialCommunityIcons name="water-percent" size={24} color={colors.info} />}
        {type === "temperature" && <MaterialCommunityIcons name="thermometer" size={24} color={colors.warning} />}
        {type === "sunlight" && <Feather name="sun" size={24} color={colors.success} />}
        <View>
          <Text style={[styles.sensorItemName, { color: colors.text }, I18nManager.isRTL && styles.rtlMargin]}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Text>
          <Text
            style={[styles.sensorItemTimestamp, { color: colors.textSecondary }, I18nManager.isRTL && styles.rtlMargin]}
          >
            {t("sensors.lastUpdated")}: {new Date(timestamp).toLocaleString()}
          </Text>
        </View>
      </View>
      <Text style={[styles.sensorItemValue, { color: colors.text }]}>
        {value}
        {type === "temperature" ? "°C" : "%"}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  sensorItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  rtlContainer: {
    flexDirection: "row-reverse",
  },
  sensorItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rtlSensorLeft: {
    flexDirection: "row-reverse",
  },
  sensorItemName: {
    fontWeight: "500",
    marginLeft: 12,
  },
  rtlMargin: {
    marginLeft: 0,
    marginRight: 12,
  },
  sensorItemTimestamp: {
    fontSize: 10,
    marginLeft: 12,
  },
  sensorItemValue: {
    fontWeight: "600",
  },
})

export default SensorItem

