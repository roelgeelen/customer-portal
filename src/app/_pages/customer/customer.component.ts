import {Component} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ThemeService} from "../../_helpers/theme.service";
import {AsyncPipe} from "@angular/common";
import {MatToolbar} from "@angular/material/toolbar";
import { MatIconModule} from "@angular/material/icon";
import { MatButtonModule} from "@angular/material/button";
import { MatListModule} from "@angular/material/list";
import { MatMenuModule} from "@angular/material/menu";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    MatToolbar,
    MatButtonModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  id: string = '';
  constructor(protected themeService: ThemeService, private route: ActivatedRoute) {
    this.route.children.forEach(child => {
      child.params.subscribe(params => {
        this.id = params['id']
        console.log(params)
      })
    });
  }
}
