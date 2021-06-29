import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatRooms } from 'src/app/models';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  @Output() onDeleteRoom: EventEmitter<string> = new EventEmitter<string>();

  @Input() roomList: ChatRooms = {};
  @Input() userId: string = '';

  constructor() {}

  ngOnInit(): void {}

  public deleteRoom(id: string = ''): void {
    this.onDeleteRoom.emit(id);
  }
}
