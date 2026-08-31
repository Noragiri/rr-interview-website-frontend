import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { LanguageService } from '../../services/language';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    public languageService: LanguageService,
  ) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.successMessage = this.languageService.t('registrationSuccessful');
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        console.error('Registration error:', err);

        if (typeof err.error === 'string') {
          this.errorMessage = err.error;
        } else if (err.error?.message) {
          this.errorMessage = err.error.message;
        } else if (err.error?.title) {
          this.errorMessage = err.error.title;
        } else {
          this.errorMessage = this.languageService.t('registrationFailed');
        }
      },
    });
  }
}
