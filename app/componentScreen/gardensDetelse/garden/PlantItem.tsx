import { View, Text, StyleSheet, I18nManager } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useTranslation } from "react-i18next"
import type { Plant } from "../types/garden"

interface PlantItemProps {
  plant: Plant
  colors: any
}

const PlantItem = ({ plant, colors }: PlantItemProps) => {
  const { t } = useTranslation()

  const needsMap = {
    low: {
      text: t("needs.low"),
      color: colors.info,
    },
    medium: {
      text: t("needs.medium"),
      color: colors.warning,
    },
    high: {
      text: t("needs.high"),
      color: colors.danger,
    },
  }

  return (
    <View style={[styles.plantItem, { borderBottomColor: colors.border }, I18nManager.isRTL && styles.rtlContainer]}>
      <View style={{ flex: 2, flexDirection: "row", alignItems: "center" }}>
        <View
          style={[styles.plantIcon, { backgroundColor: colors.primary + "20" }, I18nManager.isRTL && styles.rtlMargin]}
        >
          <Feather name="loader" size={16} color={colors.primary} />
        </View>
        <View>
          <Text style={[styles.plantName, { color: colors.text }]}>{plant.name}</Text>
          <Text style={[styles.plantType, { color: colors.textSecondary }]}>{plant.type}</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <View style={[styles.needBadge, { backgroundColor: needsMap[plant.waterNeeds].color + "20" }]}>
          <Text style={[styles.needBadgeText, { color: needsMap[plant.waterNeeds].color }]}>
            {needsMap[plant.waterNeeds].text}
          </Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <View style={[styles.needBadge, { backgroundColor: needsMap[plant.sunNeeds].color + "20" }]}>
          <Text style={[styles.needBadgeText, { color: needsMap[plant.sunNeeds].color }]}>
            {needsMap[plant.sunNeeds].text}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  plantItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  rtlContainer: {
    flexDirection: "row-reverse",
  },
  plantIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rtlMargin: {
    marginRight: 0,
    marginLeft: 12,
  },
  plantName: {
    fontWeight: "500",
  },
  plantType: {
    fontSize: 12,
  },
  needBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  needBadgeText: {
    fontSize: 10,
    fontWeight: "500",
  },
})

export default PlantItem

