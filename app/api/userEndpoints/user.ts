import axios, { AxiosResponse } from 'axios';
import api from '../../Constant/axios'
import { handleApiError } from '../handelerror';


export const getUser = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get(`/users/${id}/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const updateUser = async (id: number, userData: any): Promise<any> => {
  try {
    const response: AxiosResponse = await api.put(`/users/${id}/`, userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

