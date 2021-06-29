import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ChatRooms, User } from 'src/app/models';
import { ChatService } from 'src/app/services/chat.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddRoomComponent } from '../add-room/add-room.component';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-chatroom-container',
  templateUrl: './chatroom-container.component.html',
  styleUrls: ['./chatroom-container.component.scss'],
})
export class ChatroomContainerComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  public chatRooms$: Observable<ChatRooms>;
  public user?: User | null = null;
  public rooms?: ChatRooms;

  constructor(
    private chatService: ChatService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {
    this.chatRooms$ = chatService.getRoomList().pipe(
      tap((data) => {
        this.rooms = data;
      })
    );
  }

  ngOnInit(): void {
    this.subscription.add(
      this.authService.getUserData().subscribe((data) => {
        this.user = data;
      })
    );
  }

  public openAddRoomModal(): void {
    const dialogRef = this.dialog.open(AddRoomComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!!result && this.user) {
        this.chatService.addRoom(result, this.user.uid);
      }
    });
  }

  public deleteRoom(id: string) {
    this.chatService.removeRoomById(id);
  }
}
