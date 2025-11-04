import {Routes} from '@angular/router';
import {NotFoundComponent} from "./_pages/not-found/not-found.component";
import {CustomerComponent} from "./_pages/customer/customer.component";
import {ConfigurationListComponent} from "./_pages/customer/configuration-list/configuration-list.component";
import {ConfigurationComponent} from "./_pages/customer/configuration/configuration.component";
import {HistoryComponent} from "./_pages/customer/history/history.component";
import {StartComponent} from "./_pages/customer/start/start.component";
import {DelenComponent} from "./_pages/customer/delen/delen.component";
import {DocumentsComponent} from "./_pages/customer/documents/documents.component";
import {FaqComponent} from "./_pages/customer/faq/faq.component";
import {authGuard} from "./_helpers/auth.guard";
import {customersIndexGuard} from "./_helpers/customers-index.guard";

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
    children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      // {path: ':id', redirectTo: ':id/start', pathMatch: 'full'},
      {
        path: ':id',
        pathMatch: 'full',
        canActivate: [customersIndexGuard],
        component: CustomerComponent

      },
      {
        path: ':id/start',
        component: StartComponent,
        title: 'Garagedeur portaal',
        canActivate: [authGuard],
        data: {
          allowExternal: false,
          requireDealStages: ['136638156', '57521142', 'closedwon']
        }
      },
      {
        path: ':id/configurations',
        component: ConfigurationListComponent,
        title: 'configuration details',
        canActivate: [authGuard],
        data: {
          allowExternal: true
        }
      },
      {
        path: ':id/history',
        component: HistoryComponent,
        title: 'History',
        canActivate: [authGuard],
        data: {
          allowExternal: false,
          requireDealStages: ['136638156', '57521142', 'closedwon']
        }
      },
      {
        path: ':id/delen',
        component: DelenComponent,
        title: 'Delen aanleveren',
        canActivate: [authGuard],
        data: {
          allowExternal: false,
          requireDealStages: ['136638156', '57521142', 'closedwon']
        }
      },
      {
        path: ':id/documents',
        component: DocumentsComponent,
        title: 'Belangrijke documenten',
        canActivate: [authGuard],
        data: {
          allowExternal: false,
          requireDealStages: ['136638156', '57521142', 'closedwon']
        }
      },
      {
        path: ':id/faq',
        component: FaqComponent,
        title: 'Veelgestelde vragen',
        canActivate: [authGuard],
        data: {
          allowExternal: false,
          requireDealStages: ['136638156', '57521142', 'closedwon']
        }
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
