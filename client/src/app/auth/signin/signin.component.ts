import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/api.service';
import { Customer, RegisterUser } from '../../shared/types';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild('first') firstField!: ElementRef;
    registerSuccess = false;

customers!: Array<Customer>;

signinForm = new FormGroup({
  first_name: new FormControl('', {
      validators: Validators
      .required
  }),
  email: new FormControl('', {
      validators: [
        Validators.required, Validators.email
      ]
  }),
    password: new FormControl('', {
      validators: Validators.required
  }),
  repeatPassword: new FormControl('', {
      validators: Validators.required
  })
});
 
onSumbit() {
  if (!this.validateData()) {
    return;
}
const value: RegisterUser = this.signinForm.value;

const details = {
    first_name: value.first_name,
    // last_name: value.last_name,
    email: value.email,
    password: value.password
};

this.apiService.register(details).subscribe({
    next: (data) => {
        this.registerSuccess = true;
        this.signinForm.reset();

    },
    error: (err) => {
        this.registerSuccess = false;
        console.log(err);
    }
})

}

  constructor(private apiService: ApiService) { }

ngOnInit(): void { }

ngAfterViewInit(): void {
    this.firstField.nativeElement.focus();
}

validateData(): boolean {
    if (!this.signinForm.valid) {
        return false;
    }

    const password = this.signinForm.get('password');
    const repeatPassword = this.signinForm.get('repeatPassword');

    if (!password || !repeatPassword ||
        password.value !== repeatPassword.value
    ) {
        return false;
    }

    return true;
}

onSubmit() {
    if (!this.validateData()) {
        return;
    }

    const value: RegisterUser = this.signinForm.value;

    const details = {
        first_name: value.first_name,
          email: value.email,
        password: value.password
    };


    this.apiService.register(details).subscribe({
        next: (data) => {
            this.registerSuccess = true;
        },
        error: (err) => {
            this.registerSuccess = false;
            console.log(err);
        }
    })

}

}
