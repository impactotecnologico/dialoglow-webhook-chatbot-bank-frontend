import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GlobalService {
  public data: any = {};

  private _btnChat: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private translateService: TranslateService) {}

  public get btnChat(): boolean {
    return this._btnChat.getValue();
  }

  public set btnChat(chat: boolean) {
    this._btnChat.next(chat);
  }

  public onBtnChat(): Observable<boolean> {
    return this._btnChat.asObservable();
  }

  // TRANSLATE SERVICE
  async translate(value: string): Promise<string> {
    return new Promise<any>((resolve, reject) => {
      this.translateService.get(value).subscribe(async (res: string) => {
        await resolve(res);
      });
    });
  }
}
