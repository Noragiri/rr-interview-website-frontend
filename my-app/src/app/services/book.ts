import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = `${environment.apiUrl}/api/books`;

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  createBook(book: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  updateBook(id: number, book: Book): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, book);
  }
}
