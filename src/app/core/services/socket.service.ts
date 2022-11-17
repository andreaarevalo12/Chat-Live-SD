import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs'; 
import { io } from "socket.io-client"
import { MessageInfo, MessageType } from 'src/app/models/message.modul';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public usersConnected$: BehaviorSubject<{}> = new BehaviorSubject({});
  public privateMessage$: BehaviorSubject<{}> = new BehaviorSubject({});

  public user: User = {};
  public chatMessages: MessageInfo[] = []

  constructor() {
    const data = sessionStorage.getItem('currentUser');
    this.onReceiveMessage()
    if (data) this.user = JSON.parse(data ? data : '');
  }

  socket = io(environment.socketURL);

  public login(user: User) {
    this.user = user;
    this.socket.emit('login', user);
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }

  public updateUsersConnected() {
    this.socket.emit('updateUsersConnected', null);
  }

  public getUsersConnected = () => {
    this.socket.on('usersConnected', (users: any) => {
      this.user.socketId = this.socket.id;
      this.usersConnected$.next(users);
    });

    return this.usersConnected$.asObservable();
  };


  public sendMessage(msg: MessageInfo){
     this.socket.emit('groupChat', msg)
  }

  onReceiveMessage(){
    this.socket.on('groupChat', (msg) => {
      msg.messageType = msg.name == this.user.name ? MessageType.sendMessage : MessageType.receiveMessage 
      this.chatMessages.push(msg)
    })
  }

  public logout() {
    this.socket.emit('closeSession', this.user.socketId);
  }

  public getPrivateMessage = () => {
    this.socket.on('privateMessage', (dataMessage: any) => {
      this.privateMessage$.next(dataMessage);
    });

    return this.privateMessage$.asObservable();
  };

  public sendPrivateMessage = (dataMessage: any) => {
    console.log('enviando mensaje privado', dataMessage)
    this.socket.emit('privateMessage', dataMessage);
  };
}
