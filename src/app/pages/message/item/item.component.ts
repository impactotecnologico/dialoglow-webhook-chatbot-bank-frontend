import { Component, Input, OnInit } from '@angular/core';
import { Message } from '@app/core/models';

@Component({
  selector: 'message-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class MessageItemComponent implements OnInit {
  @Input('message')
  public message: Message;

  constructor() {}

  ngOnInit() {}

  
}
