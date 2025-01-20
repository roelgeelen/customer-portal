import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
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
import {AsyncPipe, DatePipe} from "@angular/common";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";

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
    DatePipe,
    MatStepperModule,
    AsyncPipe
  ],
  templateUrl: './configuration-list.component.html',
  styleUrl: './configuration-list.component.scss'
})
export class ConfigurationListComponent implements OnInit {
  @Input() id: string = '';
  @Input('extern') isExtern: string = '';
  @ViewChild('stepper') stepper?: MatStepper;
  labelPosition: 'end' | 'bottom' = this.updateLabelPosition();
  displayedColumns: string[] = ['title', 'updatedAt', 'updatedBy'];
  customer: ICustomer | null = null;
  configurations: IConfiguration[] = []
  loading = false;
  error = false;
  index = 0;
  statuses: string[] = [];
  statusError: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.apiService.getCustomer(this.id).subscribe({
      next: (c) => {
        this.customer = c;
        this.getConfigurations();
      }, error: (_) => {
        this.router.navigate(['/']);
      }
    });
    this.apiService.getStatuses().subscribe(r => {
      this.apiService.getDealInfo(this.id).subscribe({
        next: (c) => {
          this.statuses = r
            .filter(item => c['properties']['available_statuses'].split(';').includes(item.label))
            .map(item => item.label);
          this.cdRef.detectChanges()
          this.setStatus(c['properties']['customer_status']);
        }, error: (_) => {
          this.statusError = true;
        }
      })
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.labelPosition = this.updateLabelPosition();
  }

  updateLabelPosition() {
    return window.innerWidth > 991 ? 'end' : 'bottom';
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

  setStatus(status: string) {
    this.stepper?.reset();
    for (let i = 0; i < this.statuses.findIndex(s => s === status); i++) {
      this.stepper!.next();  // Roep 'next()' op om naar de volgende stap te gaan
    }
  }

  protected readonly window = window;
}
