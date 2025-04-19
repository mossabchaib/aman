import axios, { AxiosResponse } from 'axios';
import api from '../../Constant/axios'
import { handleApiError } from '../handelerror';
// دالة لجلب جميع المجموعات
export const getGroups = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get('/groups/');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لجلب تفاصيل مجموعة محددة
export const getGroup = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(`/groups/${id}/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لإنشاء مجموعة جديدة
export const createGroup = async (groupData: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post('/groups/', groupData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لتحديث بيانات مجموعة محددة
export const updateGroup = async (id: number, groupData: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.put(`/groups/${id}/`, groupData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لحذف مجموعة محددة
export const deleteGroup = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await api.delete(`/groups/${id}/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
