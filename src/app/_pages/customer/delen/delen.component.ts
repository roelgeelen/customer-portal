import {Component, Input, OnInit} from '@angular/core';
import { MatIconModule} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatStepperModule} from "@angular/material/stepper";
import {ApiService} from "../../../_services/api.service";
import {Router} from "@angular/router";
import {ICustomer} from "../../../_models/customer.interface";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatIconModule,
    MatStepperModule,
  ],
  templateUrl: './delen.component.html',
  styleUrl: './delen.component.scss'
})
export class DelenComponent implements OnInit{
  @Input() id: string = '';
  @Input('extern') isExtern: string = '';

  constructor(private router: Router, private apiService: ApiService) {
  }

  ngOnInit() {

  }

}
