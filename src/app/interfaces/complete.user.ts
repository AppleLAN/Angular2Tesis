import { Client } from './client';
import { User } from './user';
import { Company } from './company';

export interface CompleteUser {
  profile: User;
  company: Company;
}
