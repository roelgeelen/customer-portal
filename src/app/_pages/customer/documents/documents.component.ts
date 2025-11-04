import {Component, Input, OnInit} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatStepperModule} from "@angular/material/stepper";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    MatIconModule,
    MatStepperModule,
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent implements OnInit {
  @Input() id: string = '';

  constructor() {
  }

  ngOnInit() {

  }

}
