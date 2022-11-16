import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/core/services/socket.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  user: any

  constructor(private auth: AngularFireAuth, private router: Router, private socketService:SocketService) { }

  ngOnInit(): void {
    this.auth.currentUser.then(user => this.user = user)
  }

  logout(){
    this.auth.signOut()
    .then(res => {
      this.socketService.logout()
      sessionStorage.removeItem('currentUser')
      sessionStorage.removeItem('usersConected')
      this.router.navigate(['login'])
    })
    .catch(err => console.log(err))
  }

}
