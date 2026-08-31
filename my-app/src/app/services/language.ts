import { Injectable, signal } from '@angular/core';

export type Lang = 'en' | 'sv';

const translations: Record<Lang, Record<string, string>> = {
  en: {
    books: 'Books',
    myQuotes: 'My Quotes',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    addNewBook: 'Add New Book',
    edit: 'Edit',
    delete: 'Delete',
    title: 'Title',
    author: 'Author',
    publishedDate: 'Published Date',
    bookCoverImage: 'Book Cover Image',
    submit: 'Submit',
    addBook: 'Add New Book',
    editBook: 'Edit Book',
    noBooksYet: 'No books yet. Add one to get started.',
    username: 'Username',
    password: 'Password',
    dontHaveAccount: "Don't have an account?",
    registerHere: 'Register here',
    alreadyHaveAccount: 'Already have an account?',
    loginHere: 'Login here',
    invalidLogin: 'Invalid username or password.',
    registrationSuccess: 'Registration successful! Redirecting to login...',
    addQuotePlaceholder: 'Add a new quote...',
    add: 'Add',
    noQuotesYet: 'No quotes yet. Add one above.',
    save: 'Save',
    cancel: 'Cancel',
    confirmDeleteBook: 'Are you sure you want to delete this book?',
    confirmDeleteQuote: 'Delete this quote?',
    failedToLoadBooks: 'Failed to load books',
    failedToDeleteBook: 'Failed to delete book',
    failedToUpdateBook: 'Failed to update book',
    failedToCreateBook: 'Failed to create book',
    failedToLoadQuotes: 'Failed to load quotes',
    failedToAddQuote: 'Failed to add quote',
    failedToUpdateQuote: 'Failed to update quote',
    failedToDeleteQuote: 'Failed to delete quote',
    addNewQuote: 'Add New Quote',
  },
  sv: {
    books: 'Böcker',
    myQuotes: 'Mina Citat',
    login: 'Logga in',
    register: 'Registrera',
    logout: 'Logga ut',
    addNewBook: 'Lägg till ny bok',
    edit: 'Redigera',
    delete: 'Radera',
    title: 'Titel',
    author: 'Författare',
    publishedDate: 'Publiceringsdatum',
    bookCoverImage: 'Bokomslag',
    submit: 'Skicka',
    addBook: 'Lägg till ny bok',
    editBook: 'Redigera bok',
    noBooksYet: 'Inga böcker än. Lägg till en för att komma igång.',
    username: 'Användarnamn',
    password: 'Lösenord',
    dontHaveAccount: 'Har du inget konto?',
    registerHere: 'Registrera här',
    alreadyHaveAccount: 'Har du redan ett konto?',
    loginHere: 'Logga in här',
    invalidLogin: 'Ogiltigt användarnamn eller lösenord.',
    registrationSuccess: 'Registrering lyckades! Omdirigerar till inloggning...',
    addQuotePlaceholder: 'Lägg till ett nytt citat...',
    add: 'Lägg till',
    noQuotesYet: 'Inga citat än. Lägg till ett ovan.',
    save: 'Spara',
    cancel: 'Avbryt',
    confirmDeleteBook: 'Är du säker på att du vill radera denna bok?',
    confirmDeleteQuote: 'Radera detta citat?',
    failedToLoadBooks: 'Misslyckades med att ladda böcker',
    failedToDeleteBook: 'Misslyckades med att radera bok',
    failedToUpdateBook: 'Misslyckades med att uppdatera bok',
    failedToCreateBook: 'Misslyckades med att skapa bok',
    failedToLoadQuotes: 'Misslyckades med att ladda citat',
    failedToUpdateQuote: 'Misslyckades med att uppdatera citat',
    failedToDeleteQuote: 'Misslyckades med att radera citat',
    failedToAddQuote: 'Misslyckades med att lägga till citat',
    addNewQuote: 'Lägg till nytt citat',
  },
};

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private storageKey = 'lang';
  currentLang = signal<Lang>(this.getInitialLang());

  private getInitialLang(): Lang {
    const saved = localStorage.getItem(this.storageKey);

    if (saved === 'sv' || saved === 'en') {
      return saved;
    }

    const preferredLanguages = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];

    const prefersSwedish = preferredLanguages.some((lang) => lang.toLowerCase().startsWith('sv'));

    return prefersSwedish ? 'sv' : 'en';
  }

  setLang(lang: Lang): void {
    this.currentLang.set(lang);
    localStorage.setItem(this.storageKey, lang);
  }

  t(key: string): string {
    return translations[this.currentLang()][key] ?? key;
  }
}
