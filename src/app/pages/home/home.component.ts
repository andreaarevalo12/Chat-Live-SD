import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import { SocketService } from 'src/app/core/services/socket.service';
import { User } from 'src/app/models/user.model';

declare function showNotification(title: any, img: any, text: any, userSelectedToSend:any):any;
declare function scrollTop(): any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  userSelectedToSend: User | undefined;
  messages: any = [];
  subscription: Subscription | undefined
  currentUser: any;

  objectMessage: any = {};


  constructor(private auth: AngularFireAuth, private socket: SocketService) {
    this.currentUser = this.socket.user;

  }

  ngOnInit(): void {
    this.subscription = this.socket.getPrivateMessage().subscribe((message: any) => {
      if (message && message.from) {
        const isMessage = this.messages.find((messagec:any) => messagec.date === message.date)
        if(isMessage){
          return
        }
        message['isEmitter'] = message.from.email === this.currentUser.email;
        setTimeout(() => {
          scrollTop()
        }, 1000);
        this.messages.push(message);
        let arrayMessage = this.objectMessage[`${message.to.idSocket}__${message.from.idSocket}`]
        debugger
        if (!arrayMessage){
          arrayMessage = []
          this.objectMessage[`${message.to.idSocket}__${message.from.idSocket}`] = arrayMessage;
        }
        this.objectMessage[`${message.to.idSocket}__${message.from.idSocket}`].push(message)
        showNotification(`Nuevo mensaje de ${message.from.name}`, message.from.photoURL, message.msg, message.from);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  userSelectedEmitter(event: any) {
    this.userSelectedToSend = event;
    const arrayMessage = this.objectMessage[`${this.currentUser.socketId}__${this.userSelectedToSend?.socketId}`];
    if(!arrayMessage){
      this.objectMessage[`${this.currentUser.socketId}__${this.userSelectedToSend?.socketId}`] = []
    }
  }

  resetPrivateChat(event: any){
    this.userSelectedToSend = undefined;
  }

}
