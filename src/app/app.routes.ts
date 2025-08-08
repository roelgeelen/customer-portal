import { Routes } from '@angular/router';
import {NotFoundComponent} from "./_pages/not-found/not-found.component";
import {CustomerComponent} from "./_pages/customer/customer.component";
import {ConfigurationListComponent} from "./_pages/customer/configuration-list/configuration-list.component";
import {ConfigurationComponent} from "./_pages/customer/configuration/configuration.component";
import {HistoryComponent} from "./_pages/customer/history/history.component";

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
      {path: ':id', redirectTo: ':id/configurations', pathMatch: 'full'},
      {
        path: ':id/configurations',
        component: ConfigurationListComponent,
        title: 'configuration details'
      },
      {
        path: ':id/history',
        component: HistoryComponent,
        title: 'History'
      },
    ]
  },
  {
    path: 'customers/:id/configurations/:configId',
    component: ConfigurationComponent,
    title: 'Configuration'
  },
  {
    path: 'customers/:id/history/:configId',
    component: ConfigurationComponent,
    title: 'Configuration'
  },
];
