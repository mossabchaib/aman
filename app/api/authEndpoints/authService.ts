import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosResponse } from 'axios';
import api from '../../Constant/axios';
import { path } from '../../Constant/path';
import { handleApiError } from '../handelerror';

export const login = async (email: string, password: string): Promise<{ success: boolean }> => {
  try {
    const response = await api.post(`${path}login/`, {
      email,
      password,
    });

    if (response.status === 200) {
      const { id, email, name } = response.data;
      await AsyncStorage.setItem("id", id.toString());
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("name", name);

      return { success: true };
    }

    return { success: false };
  } catch (error) {
    handleApiError(error);
    throw new Error("Invalid credentials");
  }
};

export const logout = async (): Promise<void> => {
  await AsyncStorage.clear(); 
};

export const register = async (password: string): Promise<{ success: boolean }> => {
  try {
    const data = await AsyncStorage.getItem("information");

    if (!data) {
      Alert.alert('Error', 'Something went wrong', [{ text: "OK" }]);
      return { success: false };
    }

    const parsedData = JSON.parse(data);
    const payload = {
      username: parsedData.username,
      email: parsedData.email,
      password,
      is_superuser: false,
    };

    const response = await api.post(`${path}users/`, payload);

    if (response.status === 201) {
      await AsyncStorage.setItem("id", response.data.id.toString());
      Alert.alert("Success", "Good job.", [{ text: "OK" }]);
      return { success: true };
    }

    return { success: false };
  } catch (error) {
    handleApiError(error);
    return { success: false };
  }
};

export const forgotPassword = async (email: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post(`${path}forgot-password/`, { email });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const resetPassword = async (uidb64: string, token: string, password: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post(`${path}reset-password/${uidb64}/${token}/`, { password });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
