import {Component, Input, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../_services/api.service";
import {ICustomer} from "../../../_models/customer.interface";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {IConfiguration} from "../../../_models/configuration.interface";
import {MatButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-configuration-list',
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
    MatNoDataRow,
    DatePipe
  ],
  templateUrl: './configuration-list.component.html',
  styleUrl: './configuration-list.component.scss'
})
export class ConfigurationListComponent implements OnInit {
  @Input() id: string = '';
  @Input('extern') isExtern: string = '';
  displayedColumns: string[] = ['title', 'updatedAt', 'updatedBy'];
  customer: ICustomer | null = null;
  configurations: IConfiguration[] = []
  loading = false;
  error = false;

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getCustomer(this.id).subscribe({
      next: (c) => {
        this.customer = c;
        this.getConfigurations();
      }, error: (_) => {
        this.router.navigate(['/']);
      }
    })

  }

  getConfigurations() {
    this.loading = true;
    this.error = false;
    this.apiService.getConfigurations(this.id).subscribe({
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
    this.router.navigate([row.id], {relativeTo: this.route, queryParams: {extern: this.isExtern}});
  }
}
