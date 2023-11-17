import { Component, OnInit } from '@angular/core';
import { ProfileLevelEnum } from 'src/app/enums/profile-level.enum';
import { SpecialityEnum } from 'src/app/enums/speciality.enum';
import { UserResponse } from 'src/app/interfaces/user-response';
import { UserService } from 'src/app/services/user.service';
import { UserRequest } from '../../interfaces/user-request';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})

export class ListUsersComponent implements OnInit {

  listUsers: UserResponse[] = [];
  displayedColumns = ['userName', 'fullname', 'level', 'speciality', 'email', 'phone', 'delete'];
  enumLevels = ProfileLevelEnum;
  speciality = SpecialityEnum;
  
  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (value) => {
        this.listUsers = value;
        console.log(value);
      },
      error: (err) => {
        
      },
    })
  }

  deleteUser(index: number) {
    const id = this.listUsers[index].id;
    this.userService.deleteUser(id).subscribe({
      next: _ => {
        this.getUsers();
        alert('Cliente deletado com sucesso!')
      },
      error: err => {
        console.log(err);
        
      }
    });
  }

  editUser(index: number) {
    const user = this.listUsers[index];
    const dialogRef = this.dialog.open(DialogEditUserComponent, {
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      result && this.okEditUser(result);
    });
  }

  okEditUser(user: UserRequest) {
    user.speciality = Number(user.speciality);
    user.level = Number(user.level);
    if (!user.password) user.password = undefined; 
    this.userService.updateUser(user).subscribe({
      next: _ => {
        this.getUsers();
      },
      error: err => {}
    });
  }

}
