import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CepService } from 'src/app/services/cep.service';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-form-register-unit',
  templateUrl: './form-register-unit.component.html',
  styleUrls: ['./form-register-unit.component.scss']
})
export class FormRegisterUnitComponent implements OnInit {

  formUnit: FormGroup = new FormGroup({});
  message: string = '';
  error: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private unitService: UnitService,
    private cepService: CepService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.formUnit = this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      street: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      neighborhood: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      cep: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      number: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
    });
  }

  registerUnitButton() {
    if (this.formUnit.invalid) return;
    let requestBody = this.formUnit.value;
    this.unitService.createUnit(requestBody).subscribe({
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

  getCep() {
    let cep = this.formUnit.get('cep');
    if (cep == null || cep.invalid) return;
    this.cepService.getCep(cep.value)
      .subscribe(resp => {
        this.formUnit.get('street')?.setValue(`${resp.logradouro} - ${resp.localidade} - ${resp.bairro} - ${resp.estado}`);
      })
  }

  cancel() {
    this.location.back();
  }

}
