import { Component } from '@angular/core';
import {FormPageComponent} from "./form-page/form-page.component";
import {ApiService} from "../../../_services/api.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {IConfiguration} from "../../../_models/configuration.interface";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SafeHtmlPipe} from "../../../_helpers/pipes/safe-html.pipe";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

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
    MatIconModule
  ],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss'
})
export class ConfigurationComponent {
  configuration: IConfiguration | null = null;
  safe3dUrl: SafeResourceUrl = '';
  constructor(private apiService: ApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.route.paramMap.subscribe(params => {
      if (params.get('configId')) {
        this.apiService.getConfiguration(params.get('id')!, params.get('configId')!).subscribe(c=>{
          console.log(c)
          this.configuration = c;
          if (this.configuration?.preview?.url3D) {
            this.getSafeUrl(this.configuration?.preview?.url3D)
          }
        });
      }
    });
  }

  getSafeUrl(url: string) {
    this.safe3dUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  print() {
    window.print()
  }
}
