import axios, { AxiosResponse } from 'axios';
import api from '../../Constant/axios'
import { handleApiError } from '../handelerror';

// دالة لجلب جميع التراخيص (Authorizations)
export const getAuthorizations = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get('/authorizations/');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};


export const getAuthorization = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(`/authorizations/${id}/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لإنشاء ترخيص جديد
export const createAuthorization = async (authorizationData: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post('/authorizations/', authorizationData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لتحديث ترخيص موجود
export const updateAuthorization = async (id: number, authorizationData: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.put(`/authorizations/${id}/`, authorizationData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دالة لحذف ترخيص بناءً على الـ id
export const deleteAuthorization = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await api.delete(`/authorizations/${id}/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
