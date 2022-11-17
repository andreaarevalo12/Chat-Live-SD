import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SocketService } from 'src/app/core/services/socket.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userSelectedToSend: User | undefined;

  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {
    this.auth.currentUser.then((data) => console.log(data));
  }

  userSelectedEmitter(event: any) {
    this.userSelectedToSend = event;
  }

  resetPrivateChat(event: any){
    this.userSelectedToSend = undefined;
  }

}
