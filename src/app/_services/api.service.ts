import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICustomer} from "../_models/customer.interface";
import {IConfiguration} from "../_models/configuration.interface";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getCustomer(id: string) {
    return this.http.get<ICustomer>(`${environment.apiUrl}/public/customer/${id}`);
  }

  getConfigurations(id: string) {
    return this.http.get<IConfiguration[]>(`${environment.apiUrl}/public/customer/${id}/configurations`);
  }

  getConfiguration(id: string, configId: string) {
    return this.http.get<IConfiguration>(`${environment.apiUrl}/public/customer/${id}/configurations/${configId}`);
  }
}
