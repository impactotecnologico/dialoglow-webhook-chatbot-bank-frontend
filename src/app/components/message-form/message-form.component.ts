import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription
  } from 'rxjs/Rx';
import { Component, Input, OnInit } from '@angular/core';
import { DialogflowService } from '@app/services';
import { Message } from '@app/models';
import { SessionExpireService } from './../../services/sessionExpire.service';

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {

  private _idleTimerSubscription: Subscription;
  private _timer: Observable<number>;
  private _timerSubscription: Subscription;
  public _counter = 0;

  @Input('message')
  public message: Message;

  @Input('messages')
  private messages: Message[];

  constructor(private dialogFlowService: DialogflowService, private sessionExpireService: SessionExpireService) { }

  ngOnInit() {
    this._idleTimerSubscription = this.sessionExpireService.timeoutExpired.subscribe(res => {
      this.messages.push(
        new Message('Tu sesión expiró, por favor dime nuevamente en qué puedo ayudarte', 'assets/images/bot.png', new Date())
      );
    });
  }

  public sendMessage(): void {

    this.sessionExpireService.resetTimer();

    this.message.timestamp = new Date();
    this.messages.push(this.message);

    this.dialogFlowService.getResponse(this.message.content).subscribe(res => {
      this.messages.push(
        new Message(res.result.fulfillment.speech, 'assets/images/bot.png', res.timestamp)
      );
    });

    this.message = new Message('', 'assets/images/user.png');
  }

  onKey(event: any) {
    this.sessionExpireService.resetTimer();
  }


  public startCounter() {
    if (this._timerSubscription) {
        this._timerSubscription.unsubscribe();
    }

    this._counter = 0;
    this._timer = Observable.timer(1000, 1000);
    this._timerSubscription = this._timer.subscribe(n => {
        this._counter++;
    });
  }

}
