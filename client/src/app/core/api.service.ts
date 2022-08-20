import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Customer,
  Login,
  RegisterCustomer,
  RegisterUser,
  User,
} from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private token = '';

  setToken(value: string) {
    this.token = value;
  }

  constructor(private http: HttpClient) {}

  getCustomersList(): Observable<Array<Customer>> {
      return this.GET<Array<Customer>>(`customers`);
  }

  login(details: Login): Observable<Customer> {
    return this.POST<Customer>(`login`, details);
  }

  register(user: RegisterUser): Observable<User> {
    console.log(user);

    return this.POST<Customer>(`register`, user);
  }
  registerCustomer(customer: RegisterCustomer): Observable<Customer> {
       return this.POST<Customer>(`customers`, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${environment.serverUrl}/customers/${id}`, {
      headers: { 'x-auth-token': this.token },
    });
  }
  editCustomer(details: Object): Observable<Customer>{
    return this.http.put<Customer>(`${environment.serverUrl}/customers`, details, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': this.token,
        },
      });
  }

  GET<T>(url: string): Observable<T> {
    return this.http.get<T>(`${environment.serverUrl}/${url}`, {
      headers: { 'x-auth-token': this.token },
    });
  }

  POST<T>(url: string, data: object): Observable<T> {
    return this.http.post<T>(`${environment.serverUrl}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': this.token,
      },
    });
  }
}
