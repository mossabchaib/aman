import axios, { AxiosResponse } from 'axios';
import api from '../../Constant/axios'
import { handleApiError } from '../handelerror';
// دالة لجلب جميع حدائق الأبراج
export const getTowerGardens = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get('/tower-gardens/');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لجلب تفاصيل حديقة برج محددة
export const getTowerGarden = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(`/tower-gardens/${id}/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لإنشاء حديقة برج جديدة
export const createTowerGarden = async (towerGardenData: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post('/tower-gardens/', towerGardenData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لتحديث بيانات حديقة برج محددة
export const updateTowerGarden = async (id: number, towerGardenData: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.put(`/tower-gardens/${id}/`, towerGardenData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لحذف حديقة برج محددة
export const deleteTowerGarden = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await api.delete(`/tower-gardens/${id}/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
