import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ITheme, ThemeService} from "../../_helpers/theme.service";
import {AsyncPipe} from "@angular/common";
import {MatToolbar} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatListItem, MatListModule} from "@angular/material/list";

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
    RouterLinkActive
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
