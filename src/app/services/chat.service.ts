import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatRoom, IMessage } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private _db: AngularFirestore) {}

  public getRoomMessages(roomId: string): Observable<any> {
    return this._db
      .collection('rooms')
      .doc(roomId)
      .collection('messages')
      .snapshotChanges()
      .pipe(
        map((messages) => {
          return messages.map((message) => {
            const data = message.payload.doc.data() as Object;
            return {
              ...data,
              id: message.payload.doc.id,
            };
          });
        })
      );
  }

  public sendMessage(roomId: string, userId: string, body: string): void {
    this._db
      .collection('rooms')
      .doc(roomId)
      .collection('messages')
      .add(<IMessage>{
        body,
        userId,
        timestamp: new Date().getTime(),
      });
  }

  public addRoom(roomName: string, userId: string): void {
    this._db.collection('rooms').add(<ChatRoom>{
      roomName: roomName,
      activeUsers: [],
      userCreatedId: userId,
    });
  }

  public removeRoomById(roomId: string): void {
    //TODO
    this._db.collection('rooms').doc(roomId).delete();
  }

  public getRoomList(): Observable<any> {
    return this._db
      .collection('rooms')
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return snaps.map((snap) => {
            const data = snap.payload.doc.data() as Object;
            return {
              ...data,
              id: snap.payload.doc.id,
            };
          });
        })
      );
  }

  public addActiveUserToChatRoom(nickname: string): void {}
  public removeActiveUserFromChatRoom(nickname: string): void {}
}
