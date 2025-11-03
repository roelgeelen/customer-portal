import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {ICustomer} from "../_models/customer.interface";
import {IConfiguration} from "../_models/configuration.interface";
import {environment} from "../../environments/environment";
import {IStatus} from "../_models/status.interface";
import {IFAQ} from "../_models/faq.interface";
import {IDeal} from "../_models/deal.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getStatuses() {
    return this.http.get<IStatus[]>(`${environment.apiUrl}/public/customer/statuses`);
  }

  getFAQ() {
    return this.http.get<IFAQ[]>(`${environment.apiUrl}/public/customer/faq`);
  }

  getContacts(id: string) {
    return this.http.get<ICustomer>(`${environment.apiUrl}/public/customer/${id}/contacts`);
  }

  getCustomer(id: string) {
    return this.http.get<ICustomer>(`${environment.apiUrl}/public/customer/${id}`);
  }

  getDealInfo(id: string) {
    return this.http.get<IDeal>(`${environment.apiUrl}/public/customer/${id}/deal`);
  }

  getConfigurations(id: string, type: string) {
    return this.http.get<IConfiguration[]>(`${environment.apiUrl}/public/customer/${id}/configurations?type=${type}`);
  }

  getConfiguration(id: string, configId: string, isExtern: boolean) {
    return this.http.get<IConfiguration>(`${environment.apiUrl}/public/customer/${id}/configurations/${configId}?extern=${isExtern}`);
  }

  saveSignature(id: string|undefined, configId: string, file: string, name: string) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    return this.http.post<IConfiguration>(`${environment.apiUrl}/public/customer/${id}/configurations/${configId}/sign`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
