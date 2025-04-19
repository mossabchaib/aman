import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '../components/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
// import { AUTH_MESSAGES } from '../Constant/messages';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS, BORDER_RADIUS } from '../utils/theme';

export default function PasswordScreen() {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  
  const colorScheme = useColorScheme();
  const colors = useThemeColors(colorScheme);
  const router = useRouter();

  const handleContinue = async () => {
    if (isLoading) return;

    if (!password || !confirmPassword) {
      // Alert.alert('خطأ',  [{ text: 'موافق' }]);
      return;
    }

    if (password !== confirmPassword) {
      // Alert.alert('خطأ', AUTH_MESSAGES.ERROR.PASSWORDS_DO_NOT_MATCH, [{ text: 'موافق' }]);
      return;
    }

    if (password.length < 8) {
      // Alert.alert('خطأ', AUTH_MESSAGES.ERROR.PASSWORD_TOO_SHORT, [{ text: 'موافق' }]);
      return;
    }

    setIsLoading(true);

    try {
      const data = await AsyncStorage.getItem("information");
      if (!data) {
        // Alert.alert('خطأ', AUTH_MESSAGES.ERROR.SOMETHING_WENT_WRONG, [{ text: 'موافق' }]);
        return;
      }

      const parsedData = JSON.parse(data);
      const updatedData = {
        ...parsedData,
        password: password
      };

      await AsyncStorage.setItem("information", JSON.stringify(updatedData));
      // router.push('/screens/emailVerificationScreen');
    } catch (error) {
      // Alert.alert('خطأ', AUTH_MESSAGES.ERROR.SOMETHING_WENT_WRONG, [{ text: 'موافق' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <View style={[styles.logoCircle, { backgroundColor: COLORS.primary }]}>
                <Ionicons name="lock-closed" size={40} color={COLORS.background.light} />
              </View>
              <Text style={[styles.title, { color: colors.text }]}>إنشاء كلمة المرور</Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                اختر كلمة مرور قوية لحماية حسابك
              </Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: colors.text, backgroundColor: colors.card }]}
                  placeholder="كلمة المرور"
                  placeholderTextColor={colors.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color={colors.textSecondary} 
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: colors.text, backgroundColor: colors.card }]}
                  placeholder="تأكيد كلمة المرور"
                  placeholderTextColor={colors.textSecondary}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Ionicons 
                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color={colors.textSecondary} 
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: COLORS.primary }]}
                onPress={handleContinue}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={COLORS.background.light} />
                ) : (
                  <Text style={styles.buttonText}>متابعة</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl * 2,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
    ...SHADOWS.medium,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xxl,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    textAlign: 'center',
  },
  formContainer: {
    gap: SPACING.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card.light,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    ...SHADOWS.small,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  button: {
    height: 50,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
    ...SHADOWS.small,
  },
  buttonText: {
    color: COLORS.background.light,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
  },
});