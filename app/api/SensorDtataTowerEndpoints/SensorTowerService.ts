import api from '../../Constant/axios';
import { handleApiError } from '../handelerror';

// -------------------- SensorDtataTower Endpoints --------------------

// ✅ Get all SensorDtataTower or one by ID
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

// ✅ Create new SensorDtataTower record
export const createSensorTowerData = async (data: {
  tower_garden: number;
  sensor_type: number; // SensorData ID
  value: string;
}) => {
  try {
    const response = await api.post('/sensor-data-tower/', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// ✅ Update existing SensorDtataTower by ID
export const updateSensorTowerData = async (
  id: number,
  data: {
    tower_garden?: number;
    sensor_type?: number;
    value?: string;
  }
) => {
  try {
    const response = await api.put(`/sensor-data-tower/${id}/`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// ✅ Delete one or all SensorDtataTower
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
