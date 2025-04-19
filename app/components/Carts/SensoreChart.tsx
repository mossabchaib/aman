import { useThemeColors } from '@/app/utils/colors';
import { LineChart } from "react-native-chart-kit";
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '@/app/utils/Fonts';
import { useTranslation } from 'react-i18next'; // إضافة useTranslation

export default function SensoreChart({mode}:any) {
  const color: any = useThemeColors(mode||"light");
  const { t } = useTranslation(); // استخدام useTranslation

  const MOCK_TEMPERATURE_DATA: any = [
    { time: "00:00", value: 22 },
    { time: "04:00", value: 21 },
    { time: "08:00", value: 23 },
    { time: "12:00", value: 25 },
    { time: "16:00", value: 24 },
    { time: "20:00", value: 23 },
    { time: "24:00", value: 22 },
  ];

  const [temperatureData, setTemperatureData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      // Simulate network request
      setTimeout(() => {
        setTemperatureData(MOCK_TEMPERATURE_DATA);
      }, 1000);
    };

    loadData();
  }, []);

  return (
    <>
      {/* Header */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: color.text }, globalStyles.text]}>
          {t('sensoreChart.sensorData')} {/* استخدام الترجمة */}
        </Text>
      </View>

      {/* Chart Header */}
      <View style={styles.chartHeader}>
        <Text style={[styles.chartTitle, { color: color.text }, globalStyles.text]}>
          {t('sensoreChart.temperature24h')} {/* استخدام الترجمة */}
        </Text>
        <View style={styles.chartLegend}>
          <View style={[styles.legendDot, { backgroundColor: color.primary }]} />
          <Text style={[styles.legendText, { color: color.textSecondary }, globalStyles.text]}>
            {t('sensoreChart.average')} {/* استخدام الترجمة */}
          </Text>
        </View>
      </View>

      {/* Line Chart */}
      <LineChart
        data={{
          labels: temperatureData.map((d: any) => d.time),
          datasets: [
            {
              data: temperatureData.map((d: any) => d.value),
            },
          ],
        }}
        width={Dimensions.get("window").width - 48}
        height={180}
        chartConfig={{
          backgroundColor: color.card,
          backgroundGradientFrom: color.card,
          backgroundGradientTo: color.card,
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
          labelColor: (opacity = 1) => color.textSecondary,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: color.primary,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
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
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  chartLegend: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
  },
});