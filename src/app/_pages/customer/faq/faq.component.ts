import {Component, Input, OnInit} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatStepperModule} from "@angular/material/stepper";
import {ApiService} from "../../../_services/api.service";
import {IFAQ} from "../../../_models/faq.interface";
import {MatAccordion, MatExpansionModule} from "@angular/material/expansion";
import {SafeHtmlPipe} from "../../../_helpers/pipes/safe-html.pipe";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

export interface FAQGroup {
  key: string;
  values: IFAQ[];
}

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
  questions: FAQGroup[] = []
  loading = false;
  error = false;

  constructor(private apiService: ApiService) {
  }


  ngOnInit() {
    this.getFaq();
  }

  getFaq() {
    this.loading = true;
    this.error = false;
    this.apiService.getFAQ().subscribe({
      next: (c) => {
        this.questions =  c.reduce((result: FAQGroup[], currentValue: IFAQ) => {
          const group = result.find(g => g.key === currentValue.values.group) || result[result.push({
            key: currentValue.values.group,
            values: []
          }) - 1];
          group.values.push(currentValue);
          return result;
        }, []);
        console.log(this.questions)
      },
      error: (_) => {
        this.loading = false
        this.error = true;
      },
      complete: () => this.loading = false
    });
  }

}
