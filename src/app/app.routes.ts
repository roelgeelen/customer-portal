import { Routes } from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";
import {CustomerComponent} from "./_pages/customer/customer.component";
import {ConfigurationListComponent} from "./_pages/customer/configuration-list/configuration-list.component";
import {ConfigurationComponent} from "./_pages/customer/configuration/configuration.component";

export const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent,
    title: '404'
  },
  {
    path: 'customers',
    component: CustomerComponent,
    title: 'Home details',
    children:[
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {
        path: ':id',
        component: ConfigurationListComponent,
        title: 'configuration details'
      }
    ]
  },
  {
    path: 'customers/:id/:configId',
    component: ConfigurationComponent,
    title: 'Configuration'
  },
];
