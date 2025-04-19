export interface Plant {
    id: string
    name: string
    type: string
    health: "good" | "warning" | "poor"
    waterNeeds: "low" | "medium" | "high"
    sunNeeds: "low" | "medium" | "high"
  }
  
  export interface SensorData {
    value: number
    timestamp: string
  }
  
  export interface GardenDetail {
    id: string
    name: string
    type: string
    description: string
    createdAt: string
    plants: Plant[]
    sensors: {
      moisture: SensorData
      temperature: SensorData
      sunlight: SensorData
    }
  }
  
  