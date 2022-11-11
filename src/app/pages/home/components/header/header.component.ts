import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  user: any

  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.auth.currentUser.then(user => this.user = user)
  }

  logout(){
    this.auth.signOut()
    .then(res => this.router.navigate(['login']))
    .catch(err => console.log(err))
  }

}
