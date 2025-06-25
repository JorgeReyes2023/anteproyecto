import { Project } from './project';
import { Sensor } from './sensor';

export interface Node {
  id: number;
  name: string;
  location: string;
  projectId?: number;
  project?: Project;
  sensors?: Sensor[];
  status: 'active' | 'inactive' | 'maintenance' | 'error';
}
