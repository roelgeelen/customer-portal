import {Component, Input, OnInit} from '@angular/core';
import { MatIconModule} from "@angular/material/icon";
import {MatStepperModule} from "@angular/material/stepper";
import {ApiService} from "../../../_services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    MatIconModule,
    MatStepperModule,
  ],
  templateUrl: './delen.component.html',
  styleUrl: './delen.component.scss'
})
export class DelenComponent implements OnInit{
  @Input() id: string = '';

  constructor() {
  }

  ngOnInit() {

  }

}
