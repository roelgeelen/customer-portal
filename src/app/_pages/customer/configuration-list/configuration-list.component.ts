import {
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
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
import {DatePipe} from "@angular/common";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {AuthenticationService} from "../../../_helpers/authentication.service";

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
    DatePipe,
    MatStepperModule,
  ],
  templateUrl: './configuration-list.component.html',
  styleUrl: './configuration-list.component.scss'
})
export class ConfigurationListComponent implements OnInit {
  @Input() id: string = '';
  isExtern: boolean = false;
  @ViewChild('stepper') stepper?: MatStepper;
  displayedColumns: string[] = ['title', 'updatedAt', 'updatedBy', 'icons'];
  customer: ICustomer | null = null;
  configurations: IConfiguration[] = []
  loading = false;
  error = false;
  index = 0;
  statuses: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authenticationService: AuthenticationService
  ) {
    this.isExtern = localStorage.getItem('extern') === '1';
    console.log(this.isExtern)
  }

  ngOnInit() {
    this.authenticationService.customer$.subscribe(c => {
      this.customer = c;
    });
    this.getConfigurations();
  }

  getConfigurations() {
    this.loading = true;
    this.error = false;
    this.apiService.getConfigurations(this.id, 'configuration').subscribe({
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
