import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client"
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public usersConnected$: BehaviorSubject<{}> = new BehaviorSubject({});
  
  public user:User = {}

  constructor() {
    const data = sessionStorage.getItem('currentUser');
    if (data)
      this.user = JSON.parse(data ? data : '')
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
    this.socket.on('usersConnected', (users:any) => {
      this.user.socketId = this.socket.id
      this.usersConnected$.next(users);
    });
    
    return this.usersConnected$.asObservable();
  };

  public logout() {
    this.socket.emit('closeSession', this.user.socketId);
  }

}
