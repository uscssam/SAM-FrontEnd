import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/interfaces/user-response';
import { UserService } from 'src/app/services/user.service';
import { UserRequest } from '../../interfaces/user-request';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { Option } from 'src/app/interfaces/option';
import { Constants } from 'src/app/shared/constants';
import { ProfileLevelEnum, ProfileLevelEnumDescriptions } from 'src/app/enums/profile-level.enum';
import { SpecialityEnum, SpecialityEnumDescriptions } from 'src/app/enums/speciality.enum';

@Component({
    selector: 'app-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.scss']
})

export class ListUsersComponent implements OnInit {

    listUsers: UserResponse[] = [];
    displayedColumns = ['userName', 'fullname', 'level', 'speciality', 'email', 'phone', 'delete'];

    constructor(
        private userService: UserService,
        private dialog: MatDialog
    ) { }

    getProfileLevelDescription(level: ProfileLevelEnum): string {
        return ProfileLevelEnumDescriptions[level];
    }

    getSpecialityDescription(speciality: SpecialityEnum): string {
        return SpecialityEnumDescriptions[speciality];
    }

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

    deleteUser(user: UserResponse) {
        const id = user.id;
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

    editUser(user: UserRequest) {
        const dialogRef = this.dialog.open(DialogEditUserComponent, {
            data: user
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            result && this.okEditUser(result);
        });
    }

    okEditUser(user: UserRequest) {
        if (!user.password) user.password = undefined;
        this.userService.updateUser(user).subscribe({
            next: _ => {
                this.getUsers();
            },
            error: err => { }
        });
    }

}
