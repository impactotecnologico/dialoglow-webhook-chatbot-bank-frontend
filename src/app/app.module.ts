import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { DialogflowService } from '@app/services';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MessageFormComponent, MessageItemComponent, MessageListComponent } from '@app/components';
import { NgModule } from '@angular/core';
import { SessionExpireService } from './services/sessionExpire.service';

@NgModule({
  declarations: [
    AppComponent,
    MessageListComponent,
    MessageFormComponent,
    MessageItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    DialogflowService,
    SessionExpireService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
