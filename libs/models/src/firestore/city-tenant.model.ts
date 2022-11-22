import { CityTenantDTO } from '../admin/cityTenantDTO.model';

export class CityTenant {
  id: string;
  cityName: string;
  telegramChatId: number;
  telegramChatLink: string;
  eventsCollection?: Event[];
  createdAt: Date;
  updatedAt: Date;

  constructor(args: CityTenantDTO) {
    this.id = args.id;
    this.cityName = args.cityName;
    this.telegramChatId = args.telegramChatId;
    this.telegramChatLink = args.telegramChatLink;

    const createAtDate = new Date(0);
    createAtDate.setUTCSeconds(args.createdAt.seconds);
    this.createdAt = createAtDate;

    const updatedAtDate = new Date(0);
    updatedAtDate.setUTCSeconds(args.updatedAt.seconds);
    this.updatedAt = updatedAtDate;
  }
}
