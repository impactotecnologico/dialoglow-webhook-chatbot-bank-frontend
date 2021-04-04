import { BehaviorSubject, Observable, Subject, Subscription, timer } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SessionExpireService {
  private _count = 0;
  private _serviceId: string = 'idleTimeoutSvc-' + Math.floor(Math.random() * 10000);
  private _timeoutSeconds = 90;
  private timerSubscription: Subscription;
  private timer: Observable<number>;
  private resetOnTrigger = false;
  public timeoutExpired: Subject<number> = new Subject<number>();

  constructor() {
    console.log('Constructed idleTimeoutService ' + this._serviceId);

    this.timeoutExpired.subscribe((n) => {
      console.log('timeoutExpired subject next.. ' + n.toString());
    });

    this.startTimer();
  }

  public startTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timer = timer(this._timeoutSeconds * 1000);
    this.timerSubscription = this.timer.subscribe((n) => {
      this.timerComplete(n);
    });
  }

  public stopTimer() {
    this.timerSubscription.unsubscribe();
  }

  public resetTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timer = timer(this._timeoutSeconds * 1000);
    this.timerSubscription = this.timer.subscribe((n) => {
      this.timerComplete(n);
    });
  }

  private timerComplete(n: number) {
    this.timeoutExpired.next(++this._count);

    if (this.resetOnTrigger) {
      this.startTimer();
    }
  }
}
