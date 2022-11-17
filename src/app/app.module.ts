import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { HeaderComponent } from './pages/home/components/header/header.component';
import { GroupChatComponent } from './pages/home/components/group-chat/group-chat.component';
import { UsersListComponent } from './pages/home/components/users-list/users-list.component';
import { PERSISTENCE } from '@angular/fire/compat/auth';
import { PrivateChatComponent } from './pages/home/components/private-chat/private-chat.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    GroupChatComponent,
    UsersListComponent,
    PrivateChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    { provide: PERSISTENCE, useValue: 'session' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
