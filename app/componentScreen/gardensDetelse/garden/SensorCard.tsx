import { View, Text, StyleSheet, I18nManager } from "react-native"
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons"

interface SensorCardProps {
  type: "moisture" | "temperature" | "sunlight"
  value: number
  label: string
  color: string
  unit?: string
  colors: any
}

const SensorCard = ({ type, value, label, color, unit = "%", colors }: SensorCardProps) => {
  return (
    <View
      style={[
        styles.sensorCard,
        { backgroundColor: colors.cardBackground, borderColor: colors.border },
        I18nManager.isRTL && { transform: [{ scaleX: -1 }] },
      ]}
    >
      <View style={I18nManager.isRTL ? { transform: [{ scaleX: -1 }] } : undefined}>
        {type === "moisture" && <MaterialCommunityIcons name="water-percent" size={32} color={color} />}
        {type === "temperature" && <MaterialCommunityIcons name="thermometer" size={32} color={color} />}
        {type === "sunlight" && <Feather name="sun" size={32} color={color} />}
        <Text style={[styles.sensorValue, { color: colors.text }]}>
          {value}
          {unit}
        </Text>
        <Text style={[styles.sensorLabel, { color: colors.textSecondary }]}>{label}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  sensorCard: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
    borderWidth: 1,
  },
  sensorValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  sensorLabel: {
    fontSize: 12,
    marginTop: 4,
  },
})

export default SensorCard

