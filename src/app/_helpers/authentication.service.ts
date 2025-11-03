import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IDeal} from "../_models/deal.interface";
import {ApiService} from "../_services/api.service";
import {ICustomer} from "../_models/customer.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  dealInfo$ = new BehaviorSubject<IDeal | null>(null);
  customer$ = new BehaviorSubject<ICustomer | null>(null);
  private loadedForId: string | null = null;

  constructor(private apiService: ApiService) {
  }

  getData(id: string) {
    if (this.loadedForId === id && this.customer$.value && this.dealInfo$.value) return;
    this.loadedForId = id;

    this.apiService.getCustomer(id).subscribe({
      next: (c) => this.customer$.next(c),
      error: (_) => {
        this.customer$.next(null); /* guard vangt dit op met redirect */
      }
    });

    this.apiService.getDealInfo(id).subscribe({
      next: (d) => this.dealInfo$.next(d),
      error: (_) => this.dealInfo$.next(null)
    });
  }

  get dealInfo(): IDeal | null {
    return this.dealInfo$.value;
  }

  clearInfo() {
    this.dealInfo$.next(null);
    this.customer$.next(null);
  }
  public isCustomer(): boolean {
    return ['136638156', '57521142', 'closedwon'].includes(this.dealInfo?.properties.dealstage ?? '');
  }
}
