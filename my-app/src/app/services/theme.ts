import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private storageKey = 'theme';
  isDarkMode = signal<boolean>(this.getInitialTheme());

  private getInitialTheme(): boolean {
    const saved = localStorage.getItem(this.storageKey);
    return saved === 'dark';
  }

  constructor() {
    this.applyTheme(this.isDarkMode());
  }

  toggleTheme(): void {
    const newValue = !this.isDarkMode();
    this.isDarkMode.set(newValue);
    this.applyTheme(newValue);
    localStorage.setItem(this.storageKey, newValue ? 'dark' : 'light');
  }

  private applyTheme(isDark: boolean): void {
    document.documentElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
  }
}
