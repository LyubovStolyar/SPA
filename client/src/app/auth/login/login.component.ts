import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { ApiService } from 'src/app/core/api.service';
import { AuthService } from 'src/app/core/auth.service';
import { Customer } from '../../shared/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  @ViewChild('emailField') emailField!: ElementRef;
  customers!: Array<Customer>;

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: Validators.required,
    }),
  });
 

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.emailField.nativeElement.focus();
}

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['customers']),
      error: (err) => console.error(err),
    });
  }
}
