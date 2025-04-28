import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {StyleManager} from "./style-manager";


export interface ITheme {
  name: string;
  displayName: string;
  imageDark?: string;
  imageLight?: string;
  accent?: string;
  primary?: string;
  isDefault?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme$ = new BehaviorSubject<ITheme>(ThemeService.defaultTheme);

  static defaultTheme: ITheme = {
    displayName: 'Different Doors',
    name: 'different-doors-theme',
    imageDark: 'assets/images/logos/logo-different-doors.svg',
    imageLight: 'assets/images/logos/logo-different-doors-wit.svg',
  };
  themes: ITheme[] = [
    ThemeService.defaultTheme,
    {
      displayName: 'Ambassa',
      name: 'ambassa-theme',
      imageDark: 'assets/images/logos/ambassa-black.png',
      imageLight: 'assets/images/logos/ambassa-white.png',
    }
  ];

  constructor(private styleManager: StyleManager) {
  }

  updateTheme(theme: ITheme): void {
    this.theme$.next(theme);
    this.styleManager.removeStyle('theme');
    this.styleManager.setStyle('theme', `${theme.name}.css`);
  }

  findTheme(themeName: string): ITheme | undefined {
    return this.themes.find(currentTheme => currentTheme.name === themeName);
  }
}
