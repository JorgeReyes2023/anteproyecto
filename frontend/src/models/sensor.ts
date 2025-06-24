import { Node } from './node';
import { Threshold } from './threshold';

export interface Sensor {
  id: number;
  name: string;
  nodeId?: number;
  status?: string;
  nodes?: Node[];
  thresholds?: Threshold[];
}
