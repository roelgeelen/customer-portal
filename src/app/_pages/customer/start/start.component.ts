import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ApiService} from "../../../_services/api.service";
import {ICustomer} from "../../../_models/customer.interface";
import {DragCarouselComponent} from "../../../_helpers/_components/drag-carousel/drag-carousel.component";
import {IStatus} from "../../../_models/status.interface";
import {SafeHtmlPipe} from "../../../_helpers/pipes/safe-html.pipe";
import {ThemeService} from "../../../_helpers/theme.service";
import {AsyncPipe} from "@angular/common";
import {Observable} from "rxjs";
import {DragScrollComponent, DragScrollItemDirective} from "ngx-drag-scroll";
import {AuthenticationService} from "../../../_helpers/authentication.service";


@Component({
  selector: 'app-start',
  standalone: true,
  imports: [
    MatStepperModule,
    MatIcon,
    MatProgressSpinner,
    DragCarouselComponent,
    SafeHtmlPipe,
    AsyncPipe,
    DragScrollItemDirective
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss',
})
export class StartComponent implements OnInit {
  @Input() id: string = '';
  @ViewChild('stepper') stepper?: MatStepper;
  contacts$!: Observable<any>;
  customer: ICustomer | null = null;
  statuses: IStatus[] = [];
  statusError: boolean = false;
  index = 0;
  slides: { src: string, title: string, href: string, external?: boolean }[] = [];
  isScroll = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private dataService: AuthenticationService,
    private cdRef: ChangeDetectorRef,
    protected themeService: ThemeService
  ) {
    this.isScroll = window.innerWidth < 1335;
  }

  ngOnInit() {
    if (this.themeService.theme$.getValue().name == "ambassa-theme") {
      this.slides = [
        {
          src: 'https://www.ambassa.nl/wp-content/uploads/sites/3/2024/03/Garagedeur-goede-kwaliteit.jpg',
          title: 'Mijn Configuraties',
          href: `/customers/${this.id}/configurations`
        },
        {
          src: 'https://www.ambassa.nl/wp-content/uploads/sites/3/2024/03/Isolatie-houten-openslaande-garagedeur.jpg',
          title: 'Service & veelgestelde vragen',
          href: `https://www.ambassa.nl/service-aanvragen/`,
          external: true
        },
      ]
    } else {
      // Different Doors
      this.slides = [
        {
          src: '/assets/images/carousel/Portal-configuraties-DD.jpg',
          title: 'Mijn configuratie',
          href: `/customers/${this.id}/configurations`
        },

        {
          src: '/assets/images/carousel/Portal-onderhoud-DD.png',
          title: 'Onderhoud & Service',
          href: `https://www.differentdoors.nl/over-ons/service`,
          external: true
        },
        {
          src: '/assets/images/carousel/Portal-documenten-DD.jpg',
          title: 'Belangrijke documenten',
          href: `/customers/${this.id}/documents`
        },
        {
          src: '/assets/images/carousel/Portal-veelgesteldevragen-DD.jpg',
          title: 'Veelgestelde vragen',
          href: `/customers/${this.id}/faq`
        },
      ];


    }
    this.contacts$ = this.apiService.getContacts(this.id);
    this.dataService.customer$.subscribe(cust => {
      this.customer = cust;
    })

    this.apiService.getStatuses().subscribe(r => {
      this.dataService.dealInfo$.subscribe({
        next: (c) => {
          this.statuses = r.filter(item => c?.properties?.available_statuses?.split(';').includes(item.value));
          if (c?.properties?.available_statuses?.includes('DD Aanlevering van delen')) {
            this.slides.splice(1, 0, {
              src: '/assets/images/carousel/Portal-delen-aanleveren-DD.jpg',
              title: 'Delen aanleveren',
              href: `/customers/${this.id}/delen`
            })
          }
          this.cdRef.detectChanges()
          this.setStatus(c?.properties.customer_status??"");
        }, error: (_) => {
          this.statusError = true;
        }
      })
    });
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    this.isScroll = width < 1335;
  }

  setStatus(status: string) {
    this.stepper?.reset();
    for (let i = 0; i < this.statuses.findIndex(s => s.value === status); i++) {
      this.stepper!.steps.get(i)!._completedOverride = true;
      this.stepper!.next();
    }
  }

  selectStep(i: number) {
    this.stepper!.linear = false;
    this.stepper!.steps.get(i)!.editable = true;
    this.stepper!.selectedIndex = i;
    setTimeout(() => {
      this.stepper!.linear = true;
      this.stepper!.steps.get(i)!.editable = false;
    })
  }

  routerLink(href: string, external?: boolean) {
    if (external) {
      window.open(href, '_blank');
    } else {
      this.router.navigate([href], {relativeTo: this.route});
    }
  }
}
