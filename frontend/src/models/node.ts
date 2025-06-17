import { Project } from './project';

export interface Node {
  id: number;
  name: string;
  location?: string;
  projectId?: number;
  project?: Project;
}
