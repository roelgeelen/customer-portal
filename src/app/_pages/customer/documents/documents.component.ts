import {Component, Input, OnInit} from '@angular/core';
import {ICustomer} from "../../../_models/customer.interface";
import {Router} from "@angular/router";
import {ApiService} from "../../../_services/api.service";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatStepperModule} from "@angular/material/stepper";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatIconModule,
    MatStepperModule,
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent implements OnInit {
  @Input() id: string = '';
  @Input('extern') isExtern: string = '';

  constructor(private router: Router, private apiService: ApiService) {
  }

  ngOnInit() {

  }

}
