import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBook,
  faQuoteLeft,
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
  faSun,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class NavComponent {
  faBook = faBook;
  faQuoteLeft = faQuoteLeft;
  faLogout = faRightFromBracket;
  faLogin = faRightToBracket;
  faRegister = faUserPlus;
  faSun = faSun;
  faMoon = faMoon;

  constructor(
    private authService: AuthService,
    private router: Router,
    public themeService: ThemeService,
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
