import {Component, Input, OnInit} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatStepperModule} from "@angular/material/stepper";
import {ApiService} from "../../../_services/api.service";
import {IFAQ} from "../../../_models/faq.interface";
import {MatAccordion, MatExpansionModule} from "@angular/material/expansion";
import {SafeHtmlPipe} from "../../../_helpers/pipes/safe-html.pipe";
import {ICustomer} from "../../../_models/customer.interface";
import {Router} from "@angular/router";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    MatIconModule,
    MatStepperModule,
    MatAccordion,
    MatExpansionModule,
    SafeHtmlPipe,
    MatProgressSpinner
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent implements OnInit {
  @Input() id: string = '';
  @Input('extern') isExtern: string = '';
  questions: IFAQ[] = []
  loading = false;
  error = false;

  constructor(private router: Router, private apiService: ApiService) {
  }


  ngOnInit() {
    this.getFaq();
  }

  getFaq() {
    this.loading = true;
    this.error = false;
    this.apiService.getFAQ().subscribe({
      next: (c) => {
        this.questions = c;
      },
      error: (_) => {
        this.loading = false
        this.error = true;
      },
      complete: () => this.loading = false
    });
  }

}
