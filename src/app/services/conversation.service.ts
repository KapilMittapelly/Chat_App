import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Conversation } from '../models/conversation';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  currentCoversation = this.socket.fromEvent<Conversation>('chat');
  conversations = this.socket.fromEvent<string[]>('chats');

  constructor(private socket: Socket) { }

  getConversation(id: string) {
    this.socket.emit('getChat', id);
  }

  newConversation() {
    const id = this.chatId();
    this.socket.emit('addChat', { id, messages: [] });
  }

  editConversation(conversation: Conversation) {
    this.socket.emit('editChat', conversation);
  }

  // tslint:disable-next-line: variable-name
  sendMessage(conversation_id, message) {
    this.socket.emit('addMessage', {id: conversation_id, message});
  }

  private chatId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

}
