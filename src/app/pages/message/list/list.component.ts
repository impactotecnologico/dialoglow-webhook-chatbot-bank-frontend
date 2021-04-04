import { Component, OnInit, AfterViewInit, Input, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Message } from '@app/core/models';
import { MessageItemComponent } from '@app/pages/message/item/item.component';
import { GlobalService } from '@app/core/services';

@Component({
  selector: 'message-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class MessageListComponent implements OnInit, AfterViewInit {
  @Input('messages')
  public messages: Message[];

  @ViewChild('chatlist', { read: ElementRef }) chatList: ElementRef;
  @ViewChildren(MessageItemComponent, { read: ElementRef }) chatItems: QueryList<MessageItemComponent>;

  constructor(private global: GlobalService) {}

  ngAfterViewInit() {
    this.chatItems.changes.subscribe((elements) => {
      // console.log('messsage list changed: ' + this.messages.length);
      this.scrollToBottom();
    });
  }

  private scrollToBottom(): void {
    try {
      this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.scrollHeight;
    } catch (err) {
      console.log('Could not find the "chatList" element.');
    }
  }

  ngOnInit() {}

  eventChat() {
    this.global.btnChat = false;
  }
}
