import { Project } from './project';
import { Sensor } from './sensor';
import { Status } from './status';

export interface Node {
  id: number;
  name: string;
  location: string;
  projectId?: number;
  project?: Project;
  sensors?: Sensor[];
  status: Status;
}
