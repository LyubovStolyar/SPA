import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { LoginComponent } from './auth/login/login.component';
import { CustomersComponent } from './customers/customers.component';
import { AuthService } from './core/auth.service';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivateChild: [AuthService],
    children: [{ 
      path: 'customers', component: CustomersComponent 
    }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
