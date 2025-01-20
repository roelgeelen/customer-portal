import {Component, Input} from '@angular/core';
import {ICustomer} from "../../../_models/customer.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../_services/api.service";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  @Input() id: string = '';
  customer: ICustomer | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getCustomer(this.id).subscribe({
      next: (c) => {
        this.customer = c;
      }, error: (_) => {
        this.router.navigate(['/']);
      }
    })

  }
}
