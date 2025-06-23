import { Company } from './company';

export interface Project {
  id: number;
  name: string;
  description?: string;
  companyId?: number;
  companies?: Company[];
}
