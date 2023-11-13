import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Option } from 'src/app/interfaces/option';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {

  formUser: FormGroup = new FormGroup({});
  levels: Option[] = Constants.Levels;
  specialities: Option[] = Constants.Specialities;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formUser = this.formBuilder.group({
      userName: new FormControl(null, [Validators.required]),
      fullname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      level: new FormControl(null, [Validators.required]),
      speciality: new FormControl(null, [Validators.required])
    });
  }

}
