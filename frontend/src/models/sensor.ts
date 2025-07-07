import { Node } from './node';
import { Threshold } from './threshold';

export interface Sensor extends SensorCreate {
  id: number;
  node?: Node | null; // Optional node object, can be null if not attached
}

export interface SensorCreate {
  name: string;
  nodeId?: number | null; // Node ID to which the sensor is attached, can be null if not attached
  status?: string;
  thresholds?: Threshold[];
  typeIds?: number[]; // Array of sensor type IDs
  types?: SensorType[]; // Optional sensor type object
}

/// SensorType is used to define the type of sensor, such as temperature, humidity, etc.
export interface SensorType extends SensorTypeCreate {
  id: number;
}

export interface SensorTypeCreate {
  name: string;
  description?: string;
  unit: string;
}
