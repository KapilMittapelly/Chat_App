export class Conversation {
  id: string;
  messages: Message[] = [];
}

export class Message {
  userId: string;
  userName: string;
  text: string;
}
