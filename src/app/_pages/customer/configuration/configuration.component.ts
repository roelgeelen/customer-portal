import {Component, Input, OnInit} from '@angular/core';
import {FormPageComponent} from "./form-page/form-page.component";
import {ApiService} from "../../../_services/api.service";
import {RouterLink} from "@angular/router";
import {IConfiguration, IConfigurationAttachment} from "../../../_models/configuration.interface";
import {DomSanitizer, SafeResourceUrl, Title} from "@angular/platform-browser";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SafeHtmlPipe} from "../../../_helpers/pipes/safe-html.pipe";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {IsArrayPipe} from "../../../_helpers/pipes/is-array.pipe";

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [
    FormPageComponent,
    MatProgressSpinner,
    SafeHtmlPipe,
    RouterLink,
    MatButton,
    MatFabButton,
    MatIconModule,
    IsArrayPipe
  ],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss', './print.scss']
})
export class ConfigurationComponent implements OnInit {
  @Input() id: string = '';
  @Input() configId: string = '';
  @Input('extern') isExtern: string = '';
  configuration: IConfiguration | null = null;
  safe3dUrl: SafeResourceUrl = '';

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer, private title: Title) {
  }

  ngOnInit(): void {
    this.apiService.getConfiguration(this.id, this.configId, this.isExtern === '1').subscribe(c => {
      this.configuration = c;
      if (this.configuration.customer.dealId != null) {
        this.title.setTitle('P' + this.configuration.customer.dealId + ' - ' + this.configuration.customer.name)
      }
      if (this.configuration?.preview?.url3D) {
        this.getSafeUrl(this.configuration?.preview?.url3D)
      }
    });
  }

  getSafeUrl(url: string) {
    this.safe3dUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  print() {
    window.print()
  }

  normalizedFiles(val: any): IConfigurationAttachment[] {
    if (!val) return [];
    return Array.isArray(val) ? val : [val];
  }

    protected readonly Array = Array;
}
