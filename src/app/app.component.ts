import { Component } from '@angular/core';
import { Message } from '@app/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public message : Message;
  public messages : Message[];


  constructor(){
    this.message = new Message('', 'assets/images/user.png');

    if ( (Math.floor(Math.random()*(20-5+1))+5) % 2 == 0 ){
      this.messages = [
        new Message('Deutsche Bank - Chat Online', 'assets/images/bot.png', new Date())
      ];
    } else {
      this.messages = [
        new Message('Bienvenido al chat de <strong> Deutsche Bank </strong>', 'assets/images/bot.png', new Date())
      ];
    }
    
  }
}
