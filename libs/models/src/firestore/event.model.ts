import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import { EventItemDto } from '../admin';

export class EventItem {
  id: string;
  cityId: string;
  name: string;
  organizer: string;
  dateTime: Date;
  description: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(args: EventItem) {
    this.id = args.id;
    this.cityId = args.cityId;
    this.name = args.name;
    this.organizer = args.organizer;
    this.dateTime = args.dateTime;
    this.description = args.description;
    this.createdBy = args.createdBy;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
  }
}

export const eventConverter = {
  toFirestore(event: EventItem): DocumentData {
    const returnData: Partial<EventItem> = {
      cityId: event.cityId,
      name: event.name,
      organizer: event.organizer,
      dateTime: event.dateTime,
      description: event.description,
      createdBy: event.createdBy,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };

    return returnData as DocumentData;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): EventItem {
    const event = snapshot.data(options) as EventItemDto;

    const createAtDate = new Date(0);
    createAtDate.setUTCSeconds(event.createdAt.seconds);

    const updatedAtDate = new Date(0);
    updatedAtDate.setUTCSeconds(event.updatedAt.seconds);

    return new EventItem({
      ...event,
      createdAt: createAtDate,
      updatedAt: updatedAtDate,
    });
  },
};
