import axios, { AxiosResponse } from 'axios';
import api from '../../Constant/axios';
import { handleApiError } from '../handelerror';

export const getNotifications = async (startDate?: string): Promise<any> => {
  try {

    const url = startDate ? `/notifications/?start_date=${startDate}` : '/notifications/';
    
    const response: AxiosResponse = await api.get(url);

    return response.data;
  } catch (error) {
  
    handleApiError(error);
    throw error; 
  }
};

// دالة لجلب تفاصيل إشعار بناءً على الـ id
export const getNotification = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(`/notifications/${id}/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لإنشاء إشعار جديد
export const createNotification = async (notificationData: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post('/notifications/', notificationData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لتحديث إشعار بناءً على الـ id
export const updateNotification = async (id: number, notificationData: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.put(`/notifications/${id}/`, notificationData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لحذف إشعار بناءً على الـ id
export const deleteNotification = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await api.delete(`/notifications/${id}/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
