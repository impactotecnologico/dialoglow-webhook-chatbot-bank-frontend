import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from '@app/core/models/message';
import { GlobalService } from '@app/core/services/';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, OnDestroy {
  public message: Message;
  public messages: Message[];
  public btnChat: boolean = false;

  private _onBtnChat: Subscription;

  constructor(private global: GlobalService) {}

  ngOnInit(): void {
    this.message = new Message('', 'assets/images/user.png');

    if ((Math.floor(Math.random() * (20 - 5 + 1)) + 5) % 2 == 0) {
      this.global.translate('nameApp').then((nameApp) => {
        this.messages = [new Message(nameApp, 'assets/images/bot.png', new Date())];
      });
    } else {
      this.global.translate('welcome').then((welcome) => {
        this.messages = [
          new Message(welcome, 'assets/images/bot.png', new Date()),
        ];
      });
    }

    this._onBtnChat = this.global.onBtnChat().subscribe((res) => {
      this.btnChat = false;
    })
  }

  eventChat() {
    this.btnChat = this.btnChat ? false : true;
  }

  ngOnDestroy() {
    this._onBtnChat.unsubscribe();
  }
}
