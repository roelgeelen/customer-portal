import {Component, Input, OnInit} from '@angular/core';
import {ICustomer} from "../../../_models/customer.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../_services/api.service";
import {IConfiguration} from "../../../_models/configuration.interface";
import {DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatStep, MatStepLabel, MatStepper, MatStepperModule} from "@angular/material/stepper";
import {AuthenticationService} from "../../../_helpers/authentication.service";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatProgressSpinner,
    MatButton,
    MatIconModule,
    DatePipe,
    MatStepperModule,
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit{
  @Input() id: string = '';
  @Input('extern') isExtern: string = '';
  displayedColumns: string[] = ['title', 'updatedAt', 'updatedBy', 'icons'];
  customer: ICustomer | null = null;
  configurations: IConfiguration[] = []
  loading = false;
  error = false;

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.customer$.subscribe({
      next: (c) => {
        this.customer = c;
        this.getConfigurations();
      }, error: (_) => {
        this.router.navigate(['/']);
      }
    });

  }

  getConfigurations() {
    this.loading = true;
    this.error = false;
    this.apiService.getConfigurations(this.id, 'workorder').subscribe({
      next: (c) => {
        this.configurations = c;
      },
      error: (_) => {
        this.loading = false
        this.error = true;
      },
      complete: () => this.loading = false
    });
  }

  selectRow(row: any) {
    console.log(this.route)
    this.router.navigate([row.id], {relativeTo: this.route, queryParams: {extern: this.isExtern}});
  }

}
