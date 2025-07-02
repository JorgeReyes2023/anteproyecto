import { Node } from './node';
import { Threshold } from './threshold';

export interface Sensor extends SensorCreate {
  id: number;
  nodes?: Node[];
}

export interface SensorCreate {
  name: string;
  nodeId?: number;
  status?: string;
  thresholds?: Threshold[];
  typeIds?: number[]; // Array of sensor type IDs
}

/// SensorType is used to define the type of sensor, such as temperature, humidity, etc.
export interface SensorType {
  id: number;
  name: string;
  description?: string;
  unit: string;
}
