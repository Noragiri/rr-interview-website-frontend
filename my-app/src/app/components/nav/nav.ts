import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBook,
  faQuoteLeft,
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth';

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

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
