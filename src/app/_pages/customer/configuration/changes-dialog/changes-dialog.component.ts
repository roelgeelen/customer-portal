import {AfterViewInit, Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {IConfiguration, IConfigurationAttachment} from "../../../../_models/configuration.interface";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {
  AngularSignaturePadModule,
  NgSignaturePadOptions,
  SignaturePadComponent
} from "@almothafar/angular-signature-pad";
import {MatButtonModule} from "@angular/material/button";
import {ApiService} from "../../../../_services/api.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import { HttpResponse } from "@angular/common/http";
import {AsyncPipe, DatePipe, JsonPipe, KeyValuePipe, NgTemplateOutlet} from "@angular/common";
import {Observable} from "rxjs";
import {IConfigChanges} from "../../../../_models/configuration-change.interface";
import {map} from "rxjs/operators";
import {MatIcon} from "@angular/material/icon";
import {SafeHtmlPipe} from "../../../../_helpers/pipes/safe-html.pipe";

@Component({
  selector: 'app-approval-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatInput,
    AngularSignaturePadModule,
    MatButtonModule,
    MatProgressSpinner,
    AsyncPipe,
    JsonPipe,
    DatePipe,
    MatIcon,
    NgTemplateOutlet,
    SafeHtmlPipe,
    KeyValuePipe
  ],
  templateUrl: './changes-dialog.component.html',
  styleUrl: './changes-dialog.component.scss'
})
export class ChangesDialogComponent implements OnInit{
  @ViewChild('dialog') private dialog?: ElementRef;
  changes$!: Observable<IConfigChanges[]>;
  loading = false;


  constructor(
    public dialogRef: MatDialogRef<ChangesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string, configId:string},
    private apiService: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.getChanges();
  }

  getChanges() {
    this.changes$ = this.apiService.getChanges(this.data.id, this.data.configId).pipe(map(c => {
      return c.content
    }));
  }

  normalizedFiles(val: any): IConfigurationAttachment[] {
    if (!val) return [];
    return Array.isArray(val) ? val : [val];
  }
}
