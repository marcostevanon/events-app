import { Channel } from '../firestore';

export interface ChannelDTO extends Channel {
  subscriberCount: number;
}
