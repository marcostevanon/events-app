import { FirebaseDateTime } from '../firebase.type';
import { CityTenant } from '../firestore';

export interface CityTenantDTO
  extends Omit<CityTenant, 'createdAt' | 'updatedAt' | 'subscriberCount'> {
  createdAt: FirebaseDateTime;
  updatedAt: FirebaseDateTime;
}
