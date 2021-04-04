import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MessageComponent } from './message.component';
import { MessageListComponent } from './list/list.component';
import { MessageItemComponent } from './item/item.component';
import { MessageFormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: MessageComponent,
  },
];

@NgModule({
  declarations: [
    MessageComponent,
    MessageListComponent,
    MessageItemComponent,
    MessageFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
})
export class MessageModule {}
