import { FirebaseDateTime } from '../firebase.type';
import { EventItem } from '../firestore';

export interface EventItemDto
  extends Omit<EventItem, 'dateTime' | 'createdAt' | 'updatedAt'> {
  dateTime: FirebaseDateTime;
  createdAt: FirebaseDateTime;
  updatedAt: FirebaseDateTime;
}

export interface EventItemCreate
  extends Omit<
    EventItem,
    'id' | 'cityId' | 'dateTime' | 'createdBy' | 'createdAt' | 'updatedAt'
  > {
  dateTime: Date;
}
