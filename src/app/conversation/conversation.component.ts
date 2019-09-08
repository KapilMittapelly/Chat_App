import { Conversation, Message } from '../models/conversation';
import { ConversationService } from '../services/conversation.service';
import { Component, OnInit, OnDestroy, ViewChildren } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { MatChip, MatChipList } from '@angular/material';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, OnDestroy {

  users = [
    {
      userId: '123',
      userName: 'Kapil',
    },
    {
      userId: '234',
      userName: 'Hitesh',
    },
    {
      userId: '456',
      userName: 'Bharat',
    },
    {
      userId: '789',
      userName: 'Kishore',
    }
  ]

  converations: Observable<any[]>;
  conversation: Conversation;
  private chat$: Subscription;
  constructor(private conversationService: ConversationService) { }
  @ViewChildren(MatChipList) chipList: MatChipList;

  user: any = this.users[0];

  ngOnInit() {
    this.chat$ = this.conversationService.currentCoversation.subscribe(conversation => {
      this.conversation = conversation;
    });
    this.converations = this.conversationService.conversations;
  }

  ngOnDestroy() {
    this.chat$.unsubscribe();
  }

  editConversation() {
    this.conversationService.editConversation(this.conversation);
  }

  sendMessage(text) {
    const message: Message = {
      userId: this.user.userId,
      userName: this.user.userName,
      text
    };
    this.conversationService.sendMessage(this.conversation.id, message);
  }

  updateUserSelection(user: any) {

    this.chipList.forEach(chipList => {
      chipList.chips.forEach(chip => {
        if (user.userName === chip.value.trim()) {
          chip.selected = true;
          this.user = user;
        }
      });
    });
  }
}
