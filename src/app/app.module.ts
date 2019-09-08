
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ConversationComponent } from './conversation/conversation.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const config: SocketIoConfig = { url: 'http://localhost:4400', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ConversationComponent,
    ConversationListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
