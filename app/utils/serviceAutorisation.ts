import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";
import * as Localization from "expo-localization";
export const getModeScreen = async (): Promise<string> => {
    try {
      const storedMode = await AsyncStorage.getItem("mode");
      if (!storedMode) {
        const systemMode: string = Appearance.getColorScheme() || "light";
        await AsyncStorage.setItem("mode", systemMode); 
        return systemMode;
      }
      const supportedModes = ["dark", "light"];
      if (supportedModes.includes(storedMode)) {
        return storedMode; 
      }
      const systemModeFallback: string = Appearance.getColorScheme() || "light";
      await AsyncStorage.setItem("mode", systemModeFallback);
      return systemModeFallback;
    } catch (error) {
      console.error("Error getting mode:", error);
      return "light"; 
    }
  };
  export const getLanguage = async (): Promise<string> => {
    try {
      const storedLanguage = await AsyncStorage.getItem("language");
      if (!storedLanguage) {
        const systemLanguage = Localization.locale.split("-")[0] || "en";
        await AsyncStorage.setItem("language", systemLanguage); 
        return 'ar';
      }
      const supportedLanguages = ["en", "ar", "fr"];
      if (supportedLanguages.includes(storedLanguage)) {
        return 'ar'; 
      }
      const systemLanguageFallback = Localization.locale.split("-")[0] || "en";
      await AsyncStorage.setItem("language", systemLanguageFallback); 
      return 'ar';
    } catch (error) {
      console.error("Error getting language:", error);
      return "en";
    }
  };
  export const getLAutorationNotification = async (): Promise<boolean> => {
    try {
        const storedValue = await AsyncStorage.getItem("autorisationnotification");
        return Boolean(storedValue||false);
    } catch (error) {
        return false; 
    }
  }