import {AfterViewInit, Component, ElementRef, Inject, Input, ViewChild} from '@angular/core';
import {IConfiguration} from "../../../../_models/configuration.interface";
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
    MatProgressSpinner
  ],
  templateUrl: './approval-dialog.component.html',
  styleUrl: './approval-dialog.component.scss'
})
export class ApprovalDialogComponent {
  @ViewChild('dialog') private dialog?: ElementRef;
  name: string = '';
  @ViewChild('signature')
  public signaturePad?: SignaturePadComponent;
  loading = false;

  protected signaturePadOptions: NgSignaturePadOptions = { // passed through to szimek/signature_pad constructor
    maxWidth: 4,
    canvasBackground: "white"
    // canvasHeight: 200
  };

  constructor(
    public dialogRef: MatDialogRef<ApprovalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfiguration,
    private apiService: ApiService,
  ) {
  }

  clear() {
    this.signaturePad?.clear();
  }

  sign(name: string) {
    const base64Data = this.signaturePad?.toDataURL('base64');
    if (name != '') {
      this.loading = true;
      this.apiService.saveSignature(this.data.customer.id, this.data.id!, base64Data!, name).subscribe({
        next: (data: any) => {
          if (data instanceof HttpResponse) {
           this.loading = false;
           this.dialogRef.close();
          }
        },
        error: (e) => {
          console.log(e);
        }
      });
    }
  }

}
