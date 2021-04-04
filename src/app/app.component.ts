import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'cha-bot';

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.translateService.setDefaultLang('es');

    const language = (window.navigator.language) ? window.navigator.language.split('-')[0] : 'es';
    this.translateService.use(language);
  }
}
