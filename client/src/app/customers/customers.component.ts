import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { RegisterCustomer, Customer } from '../shared/types';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customers!: Array<Customer>;
  showNotification = false;
  registerSuccess = false;
  buttonEdit: string = '&#128393';
  buttonDelete: string = '&#9932';
  customerToDelete: Customer | null = null;
  customerToEdit: Customer | null = null;
  customerControlFormTempl: any = null;

  customerRegForm = new FormGroup({
    first_name: new FormControl('', {
      validators: Validators.required,
    }),
    last_name: new FormControl('', {
      validators: Validators.required,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl('', {
      validators: Validators.required,
    }),
  });

  customerEditForm = () => {
    if (!this.customerControlFormTempl) {
      this.customerControlFormTempl = new FormGroup({
        first_name: new FormControl(this.customerToEdit?.first_name, {
          validators: Validators.required,
        }),
        last_name: new FormControl(this.customerToEdit?.last_name, {
          validators: Validators.required,
        }),
        email: new FormControl(this.customerToEdit?.email, {
          validators: [Validators.required, Validators.email],
        }),
        phone: new FormControl(this.customerToEdit?.phone, {
          validators: Validators.required,
        }),
      });
    }
    return this.customerControlFormTempl;
  };

  validateData(): boolean {
    if (!this.customerRegForm.valid) {
      return false;
    }
    return true;
  }

  openDeletePopUp(customer: Customer) {
    this.customerToDelete = customer;
  }

  openEditPopUp(customer: Customer) {
    this.customerToEdit = customer;
  }

  popUpCancel() {
    this.customerToDelete = null;
    this.customerToEdit = null;
    this.customerControlFormTempl = null;
  }

  deleteCustomer(id: number) {
    this.apiService.deleteCustomer(id).subscribe({
      next: (data: any) => {
        this.customers = this.customers.filter((c) => c.id != id);
      },
      error: (err: any) => console.error(err),
    });
    this.popUpCancel();
  }

  editCustomer() {
    if (!this.customerEditForm().valid) return;

    const value = this.customerEditForm().value;

    const details = {
      first_name: value.first_name,
      last_name: value.last_name,
      email: value.email,
      phone: value.phone,
      id: this.customerToEdit?.id,
    };

    this.apiService.editCustomer(details).subscribe({
      next: (data: Customer) => {
        this.customers[this.customers.findIndex((c) => c.id == data.id)] = data;
      },
      error: (err) => {
        this.registerSuccess = false;
        console.log(err);
      },
    });

    this.popUpCancel();
  }

  onSumbit() {
    if (!this.validateData()) {
      return;
    }
    const value: RegisterCustomer = this.customerRegForm.value;

    const details = {
      first_name: value.first_name,
      last_name: value.last_name,
      email: value.email,
      phone: value.phone,
    };

    this.apiService.registerCustomer(details).subscribe({
      next: (data: Customer) => {
        this.registerSuccess = true;
        this.customers.push(data);
        this.customerRegForm.reset();
      },
      error: (err) => {
        this.registerSuccess = false;
        console.log(err);
      },
    });
  }
  constructor(private apiService: ApiService, private authService:AuthService, private router: Router,) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.apiService.getCustomersList().subscribe({
      next: (data: Array<Customer>) => {
        this.customers = data;
      },
      error: (err) => console.error(err),
    });
  }
  logout() {
    console.log('ok');
    
    this.authService.logout();
    this.router.navigate(["/login"]);
}

}
