import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICustomer} from "../_models/customer.interface";
import {IConfiguration} from "../_models/configuration.interface";
import {environment} from "../../environments/environment";
import {IStatus} from "../_models/status.interface";
import {HList, IQuestion} from "../_models/FAQ/question.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getStatuses() {
    return this.http.get<IStatus[]>(`${environment.apiUrl}/public/customer/statuses`);
  }

  getCustomer(id: string) {
    return this.http.get<ICustomer>(`${environment.apiUrl}/public/customer/${id}`);
  }

  getDealInfo(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/public/customer/${id}/deal`);
  }

  getConfigurations(id: string) {
    return this.http.get<IConfiguration[]>(`${environment.apiUrl}/public/customer/${id}/configurations`);
  }

  getConfiguration(id: string, configId: string, isExtern: boolean) {
    return this.http.get<IConfiguration>(`${environment.apiUrl}/public/customer/${id}/configurations/${configId}?extern=${isExtern}`);
  }
}
