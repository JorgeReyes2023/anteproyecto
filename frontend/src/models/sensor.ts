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
}
