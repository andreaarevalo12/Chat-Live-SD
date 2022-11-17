import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SocketService } from 'src/app/core/services/socket.service';

declare function scrollTop(): any;


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

  @Input() messages: any = [];

  constructor(
    private socket: SocketService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.currentUser = this.socket.user;
  }

  ngOnInit(): void {
    this.title = `Chat con ${this.userSelectedToSend.name}`;
  }

  resetPrivateChat() {
    this.resetPrivateChatEmitter.emit(true);
  }

  onSubmit(event:any) {
    event.preventDefault()
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
    setTimeout(() => {
      scrollTop()
    }, 1000);
  }
}
