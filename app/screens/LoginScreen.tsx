import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import { login } from '../api/authEndpoints/authService';
import NetInfo from '@react-native-community/netinfo';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '../components/useColorScheme';
import { FontAwesome5, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useThemeColors } from '../utils/colors';
import { SPACING, SHADOWS, BORDER_RADIUS } from '../utils/theme';
import {  getModeScreen } from '../utils/serviceAutorisation';


export default function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [signIn, setSignIn] = useState<boolean>(false);
  const [seePassword, setSeePassword] = useState<boolean>(true);
  const router = useRouter();
  const colorScheme = useColorScheme();
  
  const [mode, setMode] = useState<"light" | "dark">("light");
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields', [{ text: 'OK' }]);
      return;
    }
    setSignIn(true);

    const netInfo = await NetInfo.fetch();
    if (netInfo.isConnected) {
      try {
        await login(email, password);
        router.push('/screens/DashboardScreen');
        return;
      } catch (error) {
        setSignIn(false);
        Alert.alert(
          'Oops...',
          'Your data is wrong. Please verify your data or create a new account.',
          [{ text: 'OK' }]
        );
      }
    } else {
      Alert.alert('Oops...', 'Your internet connection is broken.', [{ text: 'OK' }]);
      setSignIn(false);
    }
  };
  useEffect(() => {
   
    const fetchMode = async () => {
      const modeFromStorage:any = await getModeScreen();
      if (modeFromStorage && modeFromStorage !== mode) {
        setMode(modeFromStorage);
      }
    };

    fetchMode();

 
  }, []);
const colors = useThemeColors(mode);
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <KeyboardAvoidingView
          style={styles.container2}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <View style={[styles.logoCircle, { backgroundColor:"green" }]}>
                            <Ionicons name="leaf" size={40} color="#fff" />
                          </View>
          <TouchableOpacity style={styles.logo}>
            <Text style={[styles.logoText, { color: colors.text }]}>Aman</Text>
          </TouchableOpacity>
          <View style={styles.containerlogo}>
            <Text style={[styles.title, { color: colors.text }]}>Welcome back</Text>
            <Text style={[styles.subtitle, { color: colors.card }]}>
              Sign in to continue to your garden
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>username</Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: colors.text,
                  backgroundColor: colors.inputBackground,
                },
              ]}
              onChangeText={(text) => setEmail(text)}
              placeholder="Username"
              placeholderTextColor={colors.placeholderText}
            />
            <Text style={[styles.label, { color: colors.text }]}>password</Text>
            <View
              style={[
                styles.inputPasswordContainer,
                { backgroundColor: colors.inputBackground },
              ]}
            >
              <TextInput
                style={[
                  styles.inputPassword,
                  {
                    color: colors.text,
                  },
                ]}
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
                value={password.toString()}
                secureTextEntry={seePassword}
                placeholderTextColor={colors.placeholderText}
              />
              <TouchableOpacity onPress={() => setSeePassword(!seePassword)} style={{ marginRight: 10 }}>
                {seePassword ? (
                  <FontAwesome name="eye-slash" size={24} color={colors.text} />
                ) : (
                  <FontAwesome5 name="eye" size={24} color={colors.text} />
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={[styles.forgotPasswordText, { color: colors.secondaryText }]}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleLogin}>
            {signIn ? (
              <Text style={styles.buttonText}>
                <FontAwesome name="spinner" size={22} style={{ marginRight: 15 }} />
              </Text>
            ) : (
              <Text style={styles.buttonText}>Sign in</Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <Link href="/screens/information_userScreen">
          <Text style={{ color: colors.secondaryText }}>create a new account?</Text>
        </Link>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5,
    color: "red"
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
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  containerlogo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    marginBottom: 35,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '500',
  },
  inputContainer: {
    paddingLeft: 50,
    paddingRight: 50,
    height: 240,
  },
  input: {
    width: 360,
    height: 50,
    marginTop: 15,
    borderRadius: 5,
    paddingLeft: 20,
    fontSize: 15,
    marginBottom: 15
  },
  inputPassword: {
    width: 300,
    height: 50,
    borderRadius: 5,
    paddingLeft: 20,
    fontSize: 15,
  },
  inputPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 360,
    borderRadius: 5,
    height: 50,
    marginTop: 15,
    paddingRight: 17,
  },
  forgotPassword: {
    marginTop: 15,
    paddingLeft: 215,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    padding: 15,
    width: 350,
    margin: 20,
    borderRadius: 5,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});