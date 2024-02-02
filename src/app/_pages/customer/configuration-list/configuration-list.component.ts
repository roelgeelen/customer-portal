import {Component, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../_services/api.service";
import {ICustomer} from "../../../_models/customer.interface";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {IConfiguration} from "../../../_models/configuration.interface";
import {MatButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

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
    MatIconModule
  ],
  templateUrl: './configuration-list.component.html',
  styleUrl: './configuration-list.component.scss'
})
export class ConfigurationListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'updatedAt', 'updatedBy'];
  customer: ICustomer | null = null;
  configurations: IConfiguration[] = []
  loading = false;
  error = false;

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.apiService.getCustomer(params.get('id')!).subscribe({
          next: (c) => {
            this.customer = c;
            this.getConfigurations();
          }, error: (_) => {
            this.router.navigate(['/']);
          }
        })
      }
    });
  }

  getConfigurations() {
    this.loading = true;
    this.error = false;
    this.apiService.getConfigurations(this.customer!.dealId!).subscribe({
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
    this.router.navigate([row.id], {relativeTo: this.route});
  }
}
