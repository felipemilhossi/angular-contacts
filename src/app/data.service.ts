import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Contact } from './models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  auth(data: any) {
    return this.http.post(`${environment.apiUrl}v1/accounts/authenticate`, data);
  }

  createCustomer(data: any) {
    return this.http.post(`${environment.apiUrl}v1/accounts`, data);
  }

  resetPassword(data: any) {
    return this.http.post(`${environment.apiUrl}v1/accounts/reset`, data);
  }

  getContacts() {
    return this.http.get(`${environment.apiUrl}v1/contacts`);
  }

  getContact(id: string) {
    return this.http.get(`${environment.apiUrl}v1/contacts/${id}`);
  }

  updateContact(data: any) {
    return this.http.put(`${environment.apiUrl}v1/contacts`, data);
  }

  createContact(data: any) {
    return this.http.post(`${environment.apiUrl}v1/contacts`, data);
  }

  deleteContact(data: any) {
    return this.http.delete(`${environment.apiUrl}v1/contacts`, data);
  }
}
