"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  StatusBar,
  FlatList,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useThemeColors } from "@/app/utils/colors" 
import { useLanguage } from "@/app/context/LanguageContext"
import { useTranslation } from "react-i18next" 
import { getLanguage, getModeScreen } from "@/app/utils/serviceAutorisation"
import i18n from "@/app/utils/i18n"

const { width } = Dimensions.get("window")

interface OnboardingScreenProps {
  navigation: any
}

export default function OnboardingScreen({ navigation }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const flatListRef: any = useRef(null)
  const { language } = useLanguage()
  const { t } = useTranslation( )
   const [mode, setMode] = useState<"light" | "dark">("light");
  useEffect(()=>{
    console.log("SettingsScreen:",language);
   },[language])
    useEffect(()=>{
     console.log("SettingsScreen:",language);
    },[language])
     useEffect(() => {
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
     const COLORS = useThemeColors(mode);
  const features = [
    {
      id: 1,
      title: t("onboarding.features.smartMonitoring.title"),
      description: t("onboarding.features.smartMonitoring.description"),
      icon: "leaf",
    },
    {
      id: 2,
      title: t("onboarding.features.remoteControl.title"),
      description: t("onboarding.features.remoteControl.description"),
      icon: "globe",
    },
    {
      id: 3,
      title: t("onboarding.features.advancedAnalytics.title"),
      description: t("onboarding.features.advancedAnalytics.description"),
      icon: "analytics",
    },
  ]

  const handleGetStarted = useCallback(() => {
    navigation?.navigate("GardenLinkScreen")
  }, [navigation])

  const handleNext = () => {
    if (currentStep < features.length - 1) {
      const nextIndex = currentStep + 1
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true })
      setCurrentStep(nextIndex)
    } else {
      handleGetStarted()
    }
  }

  const handleSkip = () => {
    handleGetStarted()
  }

  const renderFeatureItem = ({ item }: any) => (
    <View style={styles.featureSlide}>
      <View style={styles.imageContainer}>
        <View style={[styles.iconCircle, { backgroundColor: COLORS.success }]}>
          <Ionicons name={item.icon} size={40} color="white" />
        </View>
      </View>
      <Text style={[styles.featureTitle, { color: COLORS.text }]}>{item.title}</Text>
      <Text style={[styles.featureDescription, { color: COLORS.textSecondary }]}>{item.description}</Text>
    </View>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={[styles.skipText, { color: COLORS.success }]}>{t("onboarding.skip")}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={features}
        renderItem={renderFeatureItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / width)
          setCurrentStep(newIndex)
        }}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.nextButton, { backgroundColor: COLORS.success }]} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentStep === features.length - 1 ? t("onboarding.getStarted") : t("onboarding.next")}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="white" style={styles.nextButtonIcon} />
        </TouchableOpacity>
      </View>
      <View style={{ paddingBottom: 200 }} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: "flex-end",
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    fontSize: 16,
    fontWeight: "500",
  },
  featureSlide: {
    width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    marginBottom: 20,
  },
  imageContainer: {
    width: width * 0.7,
    height: width * 0.7,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  featureTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 24,
    maxWidth: "80%",
  },
  footer: {
    marginTop: 100,
    alignItems: "center",
    paddingBottom: 20,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  nextButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  nextButtonIcon: {
    marginLeft: 10,
  },
})

