import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Option } from 'src/app/interfaces/option';
import { MachineService } from 'src/app/services/machine.service';
import { Constants } from 'src/app/shared/constants';

@Component({
    selector: 'app-form',
    templateUrl: './form-register-machine.component.html',
    styleUrls: ['./form-register-machine.component.scss']
})
export class FormRegisterMachineComponent implements OnInit {

    formMachine: FormGroup = new FormGroup({});
    status: Option[] = Constants.Status;
    message: string = '';
    error: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private machineService: MachineService,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.formMachine = this.formBuilder.group({
            name: new FormControl(null, [Validators.required]),
            status: new FormControl(null, [Validators.required]),
            lastMaintenance: new FormControl(null, [Validators.required]),
        });
    }

    registerMachineButton() {
        let requestBody = this.formMachine.value;
        this.machineService.createMachine(requestBody).subscribe({
            next: _ => {
                this.message = 'Cadastro realizado com sucesso!';
                this.location.back();
            },
            error: _ => {
                this.error = true;
                this.message = 'Desculpe. Falha ao cadastrar, tente novamente mais tarde.';
            }
        })
    }

    cancel() {
        this.location.back();
    }

}
