import { Message } from './message.interface';

export interface ChatRoom {
  roomName: string;
  id?: string;
  userCreatedId: string;
  messages?: { [timeStamp: number]: Message };
  activeUsers?: Array<string>;
}

export interface ChatRooms {
  [key: string]: ChatRoom;
}
