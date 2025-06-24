import { Company } from './company';
import { Node } from './node';

export interface Project {
  id: number;
  name: string;
  description?: string;
  company_id?: number;
  companies?: Company;
  nodes?: Node[];
}
