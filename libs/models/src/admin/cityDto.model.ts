import { FirebaseDateTime } from '../firebase.type';
import { City } from '../firestore';

export interface CityDto
  extends Omit<City, 'createdAt' | 'updatedAt' | 'subscriberCount'> {
  createdAt: FirebaseDateTime;
  updatedAt: FirebaseDateTime;
}
