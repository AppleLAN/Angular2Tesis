import { Client } from './client';
import { User } from './user';

export interface CompleteUser {
  profile: User,
  company: Client
}
