import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LanguageService } from '../../services/language';
@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookFormComponent implements OnInit {
  title = '';
  author = '';
  publishedDate = '';
  imageUrl: string | undefined = undefined;
  isEditMode = false;
  bookId: number | null = null;
  faImage = faImage;
  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    public languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEditMode = true;
      this.bookId = Number(idParam);

      this.bookService.getBook(this.bookId).subscribe({
        next: (book) => {
          this.title = book.title;
          this.author = book.author;
          this.publishedDate = book.publishedDate.substring(0, 10); // trims to YYYY-MM-DD for the date input
        },
        error: (err) => console.error(this.languageService.t('failedToLoadBook'), err),
      });
    }
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  onSubmit(): void {
    const bookData = {
      title: this.title,
      author: this.author,
      publishedDate: new Date(this.publishedDate).toISOString(),
      imageUrl: this.imageUrl,
    };

    if (this.isEditMode && this.bookId !== null) {
      const updatedBook = { id: this.bookId, ...bookData };
      this.bookService.updateBook(this.bookId, updatedBook).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (err) => console.error(this.languageService.t('failedToUpdateBook'), err),
      });
    } else {
      this.bookService.createBook(bookData).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (err) => console.error(this.languageService.t('failedToCreateBook'), err),
      });
    }
  }
}
