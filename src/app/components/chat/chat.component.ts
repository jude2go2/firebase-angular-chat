import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { IMessage } from 'src/app/models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input() set messages(messages: Array<IMessage>) {
    this._messages = messages.sort((x, y) => {
      return x.timestamp - y.timestamp;
    });
  }

  get messages(): Array<IMessage> {
    return this._messages;
  }
  @Output() onSendMessage: EventEmitter<string> = new EventEmitter();

  private _messages: Array<IMessage> = [];

  constructor() {}

  ngOnInit(): void {
    console.log(this.messages);
  }

  public sendMessage(value: string) {
    console.log(value);
    this.onSendMessage.emit(value);
  }
}
