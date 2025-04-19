import axios, { AxiosResponse } from 'axios';
import api from '../../Constant/axios'
import { handleApiError } from '../handelerror';

// دالة لجلب جميع النباتات (Plants)
export const getPlants = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get('/plants/');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لجلب تفاصيل النبات (Plant) بناءً على الـ id
export const getPlant = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(`/plants/${id}/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لإنشاء نبات جديد
export const createPlant = async (plantData: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post('/plants/', plantData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لتحديث نبات موجود
export const updatePlant = async (id: number, plantData: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.put(`/plants/${id}/`, plantData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لحذف نبات بناءً على الـ id
export const deletePlant = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await api.delete(`/plants/${id}/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
