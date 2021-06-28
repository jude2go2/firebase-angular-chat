import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chatroom-container',
  templateUrl: './chatroom-container.component.html',
  styleUrls: ['./chatroom-container.component.scss'],
})
export class ChatroomContainerComponent implements OnInit {
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getRoomList().subscribe((data) => {
      console.log(data);
    });
  }
}
