import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Card from '@/app/components/Card/Card';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/app/utils/colors';
import { globalStyles } from '@/app/utils/Fonts';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native'; // إضافة I18nManager

interface GardenProps {
  garden: {
    id: string;
    name: string;
    plants: number;
    moisture: number;
    temperature: number;
    humidity: number;
    ph: number;
  };
}

const SensorItem: React.FC<{ icon: any; value: number; label: string; color: string; colorText: any }> = ({
  icon,
  value,
  label,
  color,
  colorText,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.sensorItem}>
      {icon && icon === 'thermometer' ? (
        <Feather name={icon} size={22} color={color} />
      ) : icon && icon === 'water-outline' ? (
        <MaterialCommunityIcons name={icon} size={22} color={color} />
      ) : (
        <Ionicons name={icon} size={22} color={color} />
      )}
      <Text style={[styles.sensorValue, { color: colorText.text }, globalStyles.text]}>{value}</Text>
      <Text style={[styles.sensorLabel, globalStyles.text, { color: colorText.textSecondary }]}>{t(`gardens.${label.toLowerCase()}`)}</Text>
    </View>
  );
};

const Gardens= ({ garden,mode }:any) => {
  const color: any = useThemeColors(mode||"light");
  const { t } = useTranslation();

  const handleColor = (x: number): string => {
    return x < 40 ? color.danger : x >= 40 && x <= 70 ? color.warning : color.success;
  };

  return (
    <View>
      <TouchableOpacity key={garden.id} style={styles.card}>
        <View style={[styles.moistureBarContainer, { backgroundColor: color.therdcolor }]}>
          <View style={[styles.moistureBar, { width: `${garden.moisture}%`, backgroundColor: color.success }]} />
        </View>
      </TouchableOpacity>

      <Card key={garden.id} style={styles.gardenCard}>
        {/* Header */}
        <View style={[styles.gardenHeaderinfo, { flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }]}>
          <View>
            <View style={styles.gardenHeader}>
              <Text style={[styles.gardenName, { color: color.text }, globalStyles.text]}>{garden.name}</Text>
            </View>
            <Text style={[styles.gardenSubtitle, { color: color.textSecondary }, globalStyles.text]}>
              {t('gardens.plants', { count: garden.plants })}
            </Text>
          </View>
        </View>

        {/* Sensors */}
        <View style={[styles.sensorGrid, { flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }]}>
          <SensorItem
            icon="thermometer"
            value={garden.temperature}
            label="temp"
            color={handleColor(garden.temperature)}
            colorText={color}
          />
          <SensorItem
            icon="water-outline"
            value={garden.humidity}
            label="humidity"
            color={handleColor(garden.humidity)}
            colorText={color}
          />
          <SensorItem
            icon="analytics"
            value={garden.ph}
            label="ph"
            color={handleColor(garden.ph)}
            colorText={color}
          />
        </View>
      </Card>
    </View>
  );
};

export default Gardens;

const styles = StyleSheet.create({
  gardenCard: {
    marginBottom: 16,
  },
  gardenHeaderinfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gardenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  gardenName: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: I18nManager.isRTL ? 'right' : 'left', // ضبط اتجاه النص
  },
  gardenSubtitle: {
    fontSize: 15,
    marginBottom: 12,
    fontWeight: '500',
    marginLeft: I18nManager.isRTL ? 0 : 4, // تعديل الهامش بناءً على الاتجاه
    marginRight: I18nManager.isRTL ? 4 : 0,
  },
  card: {
    paddingHorizontal: 5,
  },
  moistureBarContainer: {
    height: 7,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#444c58',
  },
  moistureBar: {
    height: '100%',
  },
  sensorGrid: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  sensorItem: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    marginRight: I18nManager.isRTL ? 0 : 8, // تعديل الهامش بناءً على الاتجاه
    marginLeft: I18nManager.isRTL ? 8 : 0,
  },
  sensorLabel: {
    fontSize: 13,
    marginVertical: 2,
    fontWeight: '500',
    textAlign: I18nManager.isRTL ? 'right' : 'left', // ضبط اتجاه النص
  },
  sensorValue: {
    fontSize: 14,
    fontWeight: '500',
  },
});