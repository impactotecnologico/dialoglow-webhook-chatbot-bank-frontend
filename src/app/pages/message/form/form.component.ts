import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, timer } from 'rxjs';
import { DialogflowService, SessionExpireService, GlobalService } from '@app/core/services';
import { Message } from '@app/core/models';

@Component({
  selector: 'message-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
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

  constructor(
    private dialogFlowService: DialogflowService,
    private sessionExpireService: SessionExpireService,
    private global: GlobalService,
  ) {}

  ngOnInit() {
    this._idleTimerSubscription = this.sessionExpireService.timeoutExpired.subscribe((res) => {
      this.global.translate('sessionExpired').then((sessionExpired) => {
        this.messages.push(new Message(sessionExpired, 'assets/images/bot.png', new Date()));
      });
    });
  }

  public sendMessage(): void {
    this.sessionExpireService.resetTimer();

    this.message.timestamp = new Date();
    this.messages.push(this.message);

    // this.dialogFlowService.getResponse(this.message.content).subscribe((res: any) => {
    //   this.messages.push(new Message(res.result.fulfillment.speech, 'assets/images/bot.png', res.timestamp));
    // });

    this.messages.push(
      new Message('Lorem, ipsum dolor sit amet consectetur adipisicing elit.', 'assets/images/bot.png', new Date()),
    );

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
    this._timer = timer(1000, 1000);
    this._timerSubscription = this._timer.subscribe((n) => {
      this._counter++;
    });
  }
}
