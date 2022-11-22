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

  constructor(args: EventItemDto) {
    this.id = args.id;
    this.cityId = args.cityId;
    this.name = args.name;
    this.organizer = args.organizer;
    this.dateTime = args.dateTime;
    this.description = args.description;
    this.createdBy = args.createdBy;

    const createAtDate = new Date(0);
    createAtDate.setUTCSeconds(args.createdAt.seconds);
    this.createdAt = createAtDate;

    const updatedAtDate = new Date(0);
    updatedAtDate.setUTCSeconds(args.updatedAt.seconds);
    this.updatedAt = updatedAtDate;
  }
}
