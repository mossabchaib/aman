import api from '../../Constant/axios';
import { handleApiError } from '../handelerror';
import { Alert } from 'react-native';

// -------------------- SensorData Endpoints --------------------

// Get all SensorData or one by ID
export const getSensorData = async (id?: number) => {
  try {
    const url = id ? `/sensor-data/${id}/` : '/sensor-data/';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Create SensorData
export const createSensorData = async (sensorData: {
  tower_garden: number;
  sensor_type: string;
}) => {
  try {
    const response = await api.post('/sensor-data/', sensorData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Update SensorData by ID
export const updateSensorData = async (id: number, updatedData: any) => {
  try {
    const response = await api.put(`/sensor-data/${id}/`, updatedData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Delete SensorData by ID or all
export const deleteSensorData = async (id?: number) => {
  try {
    const url = id ? `/sensor-data/${id}/` : '/sensor-data/';
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};


// -------------------- SensorDtataTower Endpoints --------------------

// Get all SensorDtataTower or one by ID
export const getSensorTowerData = async (id?: number) => {
  try {
    const url = id ? `/sensor-data-tower/${id}/` : '/sensor-data-tower/';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Create SensorDtataTower
export const createSensorTowerData = async (towerData: {
  tower_garden: number;
  sensor_type: number; // ID of SensorData
  value: string;
}) => {
  try {
    const response = await api.post('/sensor-data-tower/', towerData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Update SensorDtataTower by ID
export const updateSensorTowerData = async (id: number, updatedData: any) => {
  try {
    const response = await api.put(`/sensor-data-tower/${id}/`, updatedData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Delete SensorDtataTower by ID or all
export const deleteSensorTowerData = async (id?: number) => {
  try {
    const url = id ? `/sensor-data-tower/${id}/` : '/sensor-data-tower/';
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
