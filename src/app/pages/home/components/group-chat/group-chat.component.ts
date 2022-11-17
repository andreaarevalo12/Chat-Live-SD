import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SocketService } from 'src/app/core/services/socket.service';
import { MessageType } from 'src/app/models/message.modul';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit {

  currentUser: any;
  public text = ''

  constructor(public socket: SocketService) { 
    this.currentUser = this.socket.user;
  }

  ngOnInit(): void {
  }

  public sendMessage(){

    let msg = {
       name: this.currentUser.name,
       message: this.text,
       messageType: MessageType.sendMessage,
       date: Date(),
    }

    this.socket.sendMessage(msg)
    this.text = ''
  }
}
