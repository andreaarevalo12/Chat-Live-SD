import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  usersConected: User[] = [{name:'Pachequito'}, {name:'Pachequito'}, {name:'Pachequito'}]

  constructor() { }

  ngOnInit(): void {
  }

}
