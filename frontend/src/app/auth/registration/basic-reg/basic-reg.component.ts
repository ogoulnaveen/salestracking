import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DBService } from 'src/app/services/dbservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-basic-reg',
  templateUrl: './basic-reg.component.html',
  styleUrls: ['./basic-reg.component.scss']
})
export class BasicRegComponent implements OnInit {
  registrationForm: FormGroup;
  
  
  constructor(
    private _fb: FormBuilder,
    private _dbService: DBService,
    private _router: Router
    ) { }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');

    this.registrationForm = this._fb.group({
      username: [null, [
        Validators.required
      ]],
      email: [null, [
        Validators.required
      ]],
      password: [null, [
        Validators.required
      ]],
      confirmPassword: [null, [
        Validators.required
      ]],
      first_name: [null, [
        Validators.required
      ]],
      last_name: [null, [
        Validators.required
      ]],
      phone: [null, [
        Validators.required
      ]],
      usertypename: ["", [
        Validators.required
      ]],
    });
  }
  get registerFormControl() {
    return this.registrationForm.controls;
  }
  onRegistration(){
    this._dbService.register(this.registrationForm.value).subscribe(val =>{
      this._router.navigate(["auth/login"]);
    })
    console.log(this.registrationForm.value);
  }
  onUserType(ev){
    
  }
}
