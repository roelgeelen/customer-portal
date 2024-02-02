import { Component } from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {ITheme, ThemeService} from "../../_helpers/theme.service";
import {AsyncPipe} from "@angular/common";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    MatToolbar
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  constructor(protected themeService: ThemeService) {
  }
}
