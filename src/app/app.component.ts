import { Component } from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {ThemeService} from "./_helpers/theme.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(protected themeService: ThemeService, private route: ActivatedRoute) {
    this.selectTheme(ThemeService.defaultTheme.name)
  }

  selectTheme(themeName: string) {
    const theme = this.themeService.findTheme(themeName);
    if (theme) {
      this.themeService.updateTheme(theme);

    }
  }
}
