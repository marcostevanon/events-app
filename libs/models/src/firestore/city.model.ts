import { CityDto } from '../admin/cityDto.model';

export class City {
  id: string;
  cityName: string;
  telegramChatId: number;
  telegramChatLink: string;
  status: CityStatus;
  eventsCollection?: Event[];
  subscriberCount?: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(args: CityDto) {
    this.id = args.id;
    this.cityName = args.cityName;
    this.telegramChatId = args.telegramChatId;
    this.telegramChatLink = args.telegramChatLink;
    this.status = args.status;

    const createAtDate = new Date(0);
    createAtDate.setUTCSeconds(args.createdAt.seconds);
    this.createdAt = createAtDate;

    const updatedAtDate = new Date(0);
    updatedAtDate.setUTCSeconds(args.updatedAt.seconds);
    this.updatedAt = updatedAtDate;
  }

  setSubscriberCount(subscriberCount: number) {
    this.subscriberCount = subscriberCount;
  }
}

type CityStatus = 'active' | 'not_active';
