import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { SocketService } from 'src/app/core/services/socket.service';
import { MessageType } from 'src/app/models/message.modul';

declare function scrollTop():any;

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css'],
  providers: [DatePipe],
})
export class GroupChatComponent implements OnInit {

  currentUser: any;
  formMsg: FormGroup = this.formBuilder.group({
    msg: ['', Validators.required],
  });


  constructor(public socket: SocketService, private formBuilder: FormBuilder, private datePipe: DatePipe
    ) { 
    this.currentUser = this.socket.user;
  }

  ngOnInit(): void {
  }

  public sendMessage(){

    let msg = {
       name: this.currentUser.name,
       message: this.formMsg.controls['msg'].value,
       messageType: MessageType.sendMessage,
       date: this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'),
    }

    this.socket.sendMessage(msg)
    this.formMsg.reset()
    setTimeout(() => {
      scrollTop()
    }, 1000);
  }
}
