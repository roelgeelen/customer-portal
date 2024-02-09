import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {ThemeService} from "./_helpers/theme.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(protected themeService: ThemeService, private route: ActivatedRoute, private router: Router) {

    this.route.queryParamMap.subscribe(queryParams => {
      if (queryParams.has('sig')) {
        localStorage.setItem('sig', queryParams.get('sig')!);
        this.router.navigate([], {
          queryParams: {
            'sig': null
          },
          queryParamsHandling: 'merge'
        })

      }
    });
    this.selectTheme(ThemeService.defaultTheme.name)
  }

  selectTheme(themeName: string) {
    const theme = this.themeService.findTheme(themeName);
    if (theme) {
      this.themeService.updateTheme(theme);
    }
  }
}
