import {Component, Input, OnInit} from '@angular/core';
import {FormPageComponent} from "./form-page/form-page.component";
import {ApiService} from "../../../_services/api.service";
import {RouterLink} from "@angular/router";
import {IConfiguration, IConfigurationAttachment} from "../../../_models/configuration.interface";
import {Title} from "@angular/platform-browser";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SafeHtmlPipe} from "../../../_helpers/pipes/safe-html.pipe";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {IsArrayPipe} from "../../../_helpers/pipes/is-array.pipe";
import {MatTooltip} from "@angular/material/tooltip";
import {ApprovalDialogComponent} from "./approval-dialog/approval-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ImageSliderComponent} from "../../../_helpers/_components/image-slider/image-slider.component";
import {DatePipe} from "@angular/common";
import {NgImageSliderModule} from "ng-image-slider";

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
    IsArrayPipe,
    MatTooltip,
    ImageSliderComponent,
    DatePipe,
    NgImageSliderModule
  ],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss', './print.scss']
})
export class ConfigurationComponent implements OnInit {
  @Input() id: string = '';
  @Input() configId: string = '';
  @Input('extern') isExtern: string = '';
  configuration: IConfiguration | null = null;

  constructor(private apiService: ApiService, private title: Title, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getConfiguration();
  }

  getConfiguration() {
    this.apiService.getConfiguration(this.id, this.configId, this.isExtern === '1').subscribe(c => {
      this.configuration = c;
      if (this.configuration.customer.dealId != null) {
        this.title.setTitle('P' + this.configuration.customer.dealId + ' - ' + this.configuration.customer.name)
      }
    });
  }

  print() {
    window.print()
  }

  normalizedFiles(val: any): IConfigurationAttachment[] {
    if (!val) return [];
    return Array.isArray(val) ? val : [val];
  }

  openDialog(configuration: IConfiguration|null) {
    let dialogRef = this.dialog.open(ApprovalDialogComponent, {
      data: configuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getConfiguration();
    })
  }


  convertToSlider(val: any): Array<object> {
    var values = this.normalizedFiles(val);
    return values.map(file => {
      return {
        image: file.url+'?name='+file.name,
        thumbImage: file.url+'?name='+file.name
      };
    })
  }

  protected readonly Array = Array;
}
