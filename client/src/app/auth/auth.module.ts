
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
    declarations: [
        SigninComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppRoutingModule,
    ]
})
export class AuthModule { }