import { FirebaseDateTime } from '../firebase.type';
import { EventItem } from '../firestore';

export interface EventItemDto
  extends Omit<EventItem, 'createdAt' | 'updatedAt'> {
  createdAt: FirebaseDateTime;
  updatedAt: FirebaseDateTime;
}
