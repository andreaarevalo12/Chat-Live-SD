import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocketService } from 'src/app/core/services/socket.service';

declare function showNotification(title: any, img: any, text: any):any;


@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css'],
  providers: [DatePipe],
})

export class PrivateChatComponent implements OnInit {
  
  currentUser: any;
  @Input() userSelectedToSend: any;
  @Output() resetPrivateChatEmitter: EventEmitter<boolean> = new EventEmitter();
  title: any;
  formMsg: FormGroup = this.formBuilder.group({
    msg: ['', Validators.required],
  });

  messages: any = [];

  constructor(
    private socket: SocketService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.currentUser = this.socket.user;
  }

  ngOnInit(): void {
    this.title = `Chat con ${this.userSelectedToSend.name}`;
    this.socket.getPrivateMessage().subscribe((message: any) => {
      if (message && message.from) {
        showNotification(`Nuevo mensaje de ${message.from.name}`, message.from.photoURL, message.msg);
        message['isEmitter'] = message.from.email === this.currentUser.email;
        this.messages.push(message);
      }
    });
  }

  resetPrivateChat() {
    this.resetPrivateChatEmitter.emit(true);
  }

  onSubmit() {
    const dataMessage = {
      from: this.currentUser.socketId,
      to: this.userSelectedToSend.socketId,
      date: this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'),
      msg: this.formMsg.controls['msg'].value,
      isEmitter:true
    };
    this.socket.sendPrivateMessage(dataMessage);
    this.formMsg.reset()
    this.messages.push(dataMessage)
  }
}
