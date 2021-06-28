import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private _db: AngularFirestore) {}

  public getRoomMessages(roomId: string): Observable<any> {
    return this._db
      .collection('rooms')
      .doc(roomId)
      .snapshotChanges()
      .pipe(
        map((data) => {
          return data.payload.data();
        })
      );
  }

  public addRoom(roomName: string = 'blabla'): void {
    this._db.collection('rooms').add({
      roomName: roomName,
      activeUsers: [],
    });
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

  public addActiveUserToChatRoom(id: string): void {}
  public removeActiveUserFromChatRoom(id: string): void {}
}
