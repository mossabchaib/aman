import { useColorScheme as _useColorScheme } from 'react-native';

export const useColorScheme = (): 'light' | 'dark' => {
  const colorScheme = _useColorScheme();
  // Default to 'light' if colorScheme is undefined
  return colorScheme || 'light';
};