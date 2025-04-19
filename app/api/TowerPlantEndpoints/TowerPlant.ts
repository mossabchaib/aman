import  { AxiosResponse } from 'axios';
import api from '../../Constant/axios'
import { handleApiError } from '../handelerror';
// دالة لجلب جميع النباتات في الأبراج (TowerPlants)
export const getTowerPlants = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get('/tower-plants/');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لجلب تفاصيل النبات في البرج (TowerPlant) بناءً على الـ id
export const getTowerPlant = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(`/tower-plants/${id}/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لإنشاء نبات في البرج
export const createTowerPlant = async (towerPlantData: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post('/tower-plants/', towerPlantData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لتحديث نبات في البرج
export const updateTowerPlant = async (id: number, towerPlantData: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.put(`/tower-plants/${id}/`, towerPlantData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لحذف نبات من البرج
export const deleteTowerPlant = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await api.delete(`/tower-plants/${id}/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
