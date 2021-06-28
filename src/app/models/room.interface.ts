import { Message } from './message.interface';

export interface ChatRoom {
  roomName: string;
  id: string;
  messages: { [timeStamp: number]: Message };
  activeUsers: Array<string>;
}
