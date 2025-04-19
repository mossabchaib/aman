import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/headers";
import Loading from "../../components/Loading";
import Card from "../../components/Card/Card";
import GardensCard from "../../componentScreen/Dashboard/Gardns";
import Chart from "../../components/Carts/SensoreChart";
import { useThemeColors } from "../../utils/colors";
import { RefreshCw } from "lucide-react";
import { globalStyles } from "../../utils/Fonts";
import Tabs from "../../components/tabs";
import { useTranslation } from "react-i18next";
import i18n from "../../utils/i18n";
import { getLanguage, getModeScreen } from "../../utils/serviceAutorisation";
import Layout from "../../screens/layout";
import { useLanguage } from "@/app/context/LanguageContext";


const MOCK_GARDENS = [
  { id: 1, name: "Kitchen Tower", plants: 8, status: "healthy", lastUpdated: "2 minutes ago", temperature: 24, humidity: 65, ph: 6.2, alerts: 0, moisture: 40 },
  { id: 2, name: "Patio Garden", plants: 12, status: "warning", lastUpdated: "5 minutes ago", temperature: 26, humidity: 58, ph: 5.8, alerts: 1, moisture: 80 },
  { id: 3, name: "Basement Setup", plants: 4, status: "critical", lastUpdated: "1 hour ago", temperature: 22, humidity: 70, ph: 7.1, alerts: 2, moisture: 20 },
];

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gardens, setGardens] = useState<typeof MOCK_GARDENS>([]);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const { t } = useTranslation();
 const { language } = useLanguage(); 
 useEffect(()=>{
  console.log("SettingsScreen:",language);
 },[language])
  useEffect(() => {
    setGardens(MOCK_GARDENS);
    setLoading(false);

    const fetchMode = async () => {
      const modeFromStorage:any = await getModeScreen();
      if (modeFromStorage && modeFromStorage !== mode) {
        setMode(modeFromStorage);
      }
    };

    fetchMode();

    const fetchLanguage = async () => {
      const lang = await getLanguage();
      if (lang && lang !== i18n.language) {
        i18n.changeLanguage(lang);
      }
    };

    fetchLanguage();
  }, []);

  const color = useThemeColors(mode);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  if (loading) return <Loading />;
  return (
    <Layout>
    <SafeAreaView style={[styles.container, { backgroundColor: color.background }]}>
      <Header mode={mode} />
      <View style={{ height: 70 }} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.welcomeSection}>
          <Text style={[styles.welcomeTitle, { color: color.text }, globalStyles.text]}>
            {t("dashboard.title")}
          </Text>
          <View style={styles.icons}>
            <TouchableOpacity onPress={onRefresh}>
              <View style={[styles.quickActionIcon, { backgroundColor: color.card }]}>
                <RefreshCw color={color.text} size={20} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity >
              <View style={[styles.quickActionIcon, { backgroundColor: color.success }]}>
                <Ionicons name="add" size={17} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {gardens.slice(0, 2).map((garden:any) => (
          <GardensCard  garden={garden} mode={mode} />
        ))}

        <Card style={styles.chartCard}>
          <Chart  mode={mode} />
        </Card>

        <View style={{ height: 80 }} />
      </ScrollView>

    </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16 },
  welcomeSection: {
    marginBottom: 28,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icons: { flexDirection: "row", alignItems: "center" },
  welcomeTitle: { fontSize: 24, fontWeight: "500" },
  chartCard: { padding: 12, marginBottom: 24 },
  quickActionIcon: {
    width: 43,
    height: 33,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
