import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MachineRequest } from 'src/app/interfaces/machine-request';
import { Option } from 'src/app/interfaces/option';
import { Constants } from 'src/app/shared/constants';

@Component({
    selector: 'dialog-edit-machine',
    styleUrls: ['./dialog-edit-machine.component.scss'],
    templateUrl: 'dialog-edit-machine.component.html',
    standalone: true,
    imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule],
})
export class DialogEditMachineComponent implements OnInit {

    formMachine: FormGroup = new FormGroup({});
    status: Option[] = Constants.Status;
    message: string = '';
    error: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private data: MachineRequest
    ) { }

    ngOnInit(): void {
        this.formMachine = this.formBuilder.group({
            id: new FormControl(this.data.id),
            name: new FormControl(this.data.name, [Validators.required]),
            status: new FormControl(this.data.status, [Validators.required]),
            lastMaintence: new FormControl(this.data.lastMaintenance, [Validators.required]),
        });
    }
}
