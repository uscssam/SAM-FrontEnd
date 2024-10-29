import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MachineRequest } from 'src/app/interfaces/machine-request';
import { Option } from 'src/app/interfaces/option';
import { UnitResponse } from 'src/app/interfaces/unit-response';
import { MachineService } from 'src/app/services/machine.service';
import { UnitService } from 'src/app/services/unit.service';
import { Constants } from 'src/app/shared/constants';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-form',
    templateUrl: './form-register-machine.component.html',
    styleUrls: ['./form-register-machine.component.scss']
})
export class FormRegisterMachineComponent implements OnInit {

    formMachine: FormGroup = new FormGroup({});
    status: Option[] = Constants.Status;
    units: UnitResponse[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private machineService: MachineService,
        private location: Location,
        private unitService: UnitService
    ) { }

    ngOnInit(): void {
        this.unitService.getUnits().subscribe(resp => {
            this.units = resp
        })

        this.formMachine = this.formBuilder.group({
            name: new FormControl(null, [Validators.required]),
            idUnit: new FormControl(null, [Validators.required])
        });
    }

    registerMachineButton() {
        if (this.formMachine.invalid) return;
        let machine = <MachineRequest>this.formMachine.value;
        this.machineService.createMachine(machine).subscribe({
            next: _ => {
              Swal.fire({
                text: `Máquina ${machine.name} cadastrada com sucesso!`,
                icon: 'success',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.location.back();
                }
              })
            },
            error: _ => {
              this.location.back();
            }
        })
    }

    cancel() {
        this.location.back();
    }

}
