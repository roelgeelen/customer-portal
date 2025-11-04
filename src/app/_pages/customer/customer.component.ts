import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ThemeService} from "../../_helpers/theme.service";
import {AsyncPipe} from "@angular/common";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {AuthenticationService} from "../../_helpers/authentication.service";
import {IDeal} from "../../_models/deal.interface";

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
export class CustomerComponent implements OnInit {
  id: string = '';
  isExtern: boolean = false;
  deal: IDeal | null = null;

  constructor(protected themeService: ThemeService, private route: ActivatedRoute, private authService: AuthenticationService) {
    this.isExtern = localStorage.getItem('extern') === '1';
    this.route.children.forEach(child => {
      child.params.subscribe(params => {
        this.id = params['id'];
      })
    });
  }

  get isCustomer() {
    return !this.isExtern && this.authService.isCustomer();
  }


  ngOnInit() {
    this.authService.dealInfo$.subscribe(deal => {
      this.deal = deal;
    })
  }

}
