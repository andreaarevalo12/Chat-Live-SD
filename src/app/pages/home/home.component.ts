import { Component, OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SocketService } from 'src/app/core/services/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {
    this.auth.currentUser.then(data => console.log(data))
  }

}
