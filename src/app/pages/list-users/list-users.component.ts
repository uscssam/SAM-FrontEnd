import { Component, OnInit } from '@angular/core';
import { ProfileLevelEnum } from 'src/app/enums/profile-level.enum';
import { UserResponse } from 'src/app/interfaces/user-response';
import { ListUsersService } from 'src/app/services/list-users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})

export class ListUsersComponent implements OnInit {

  listUsers: UserResponse[] = [];
  displayedColumns = ['userName', 'fullname', 'level'];
  enumLevels = ProfileLevelEnum;

  // available: true
  // deletedAt: null
  // email: "alice@gmail.com"
  // fullname: "Alice Angela"
  // id: 1
  // level: 3
  // phone: null
  // speciality: 1
  // userName: "alice"

  constructor(
      private listUserService: ListUsersService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.listUserService.getUsers().subscribe({
      next: (value) => {
        this.listUsers = value;
        console.log(value);
      },
      error: (err) => {
        
      },
    })
  }
}
