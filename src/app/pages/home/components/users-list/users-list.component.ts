import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SocketService } from 'src/app/core/services/socket.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  usersConected: User[] = [];
  currentUser: User = {};

  @Output() userSelectedEmitter: EventEmitter<User> = new EventEmitter();

  constructor(private socketService: SocketService) {
    const data = localStorage.getItem('usersConected');
    if (data) {
      this.usersConected = JSON.parse(data);
    }
  }

  ngOnInit(): void {
    this.currentUser = this.socketService.user
    this.socketService.getUsersConnected().subscribe((users) => {
      this.usersConected = Object.entries(users).map((key, value) => {
        const user: User = {};
        Object.assign(user, key[1]);
        user.socketId = key[0];
        user.name = user.name?.substring(0, 10);
        return user;
      });
      sessionStorage.setItem(
        'usersConected',
        JSON.stringify(this.usersConected)
      );
    });
    this.socketService.updateUsersConnected();
  }

  userSelectedToSend(user: User) {
    console.log(user)
    console.log(this.currentUser)
    if (this.currentUser.email === user.email) {
      return
    }
    this.userSelectedEmitter.emit(user);
  }
}
