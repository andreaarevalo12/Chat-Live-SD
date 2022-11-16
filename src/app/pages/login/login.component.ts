import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { SocketService } from 'src/app/core/services/socket.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public auth: AngularFireAuth, private router: Router, private socketService: SocketService) {}

  ngOnInit(): void {}

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(data => {
      if (data.user){
        this.socketService.login(this.getUser(data.user))
        this.router.navigate(['home'])
      }
    })
    .catch(err => console.error(err));
  }

  getUser(user: firebase.User): User {
    return {
      photoURL: user.photoURL,
      name: user.displayName,
      email: user.email
    }
  }
}
