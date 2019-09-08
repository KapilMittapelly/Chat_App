import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConversationService } from '../services/conversation.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit, OnDestroy {

  converations: Observable<string[]>;
  currentConversation: string;
  private conversation$: Subscription;

  constructor(private conversationService: ConversationService) { }

  ngOnInit() {
    this.converations = this.conversationService.conversations;
    this.conversation$ = this.conversationService.currentCoversation.subscribe(conv => this.currentConversation = conv.id);
  }

  ngOnDestroy() {
    this.conversation$.unsubscribe();
  }

  loadConversation(id: string) {
    this.conversationService.getConversation(id);
  }

  newConversation() {
    this.conversationService.newConversation();
  }

}
