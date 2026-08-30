import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Quote } from '../../models/quote.model';
import { QuoteService } from '../../services/quote';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './quote-list.html',
  styleUrl: './quote-list.css',
})
export class QuoteListComponent implements OnInit {
  quotes: Quote[] = [];
  newQuoteText = '';
  editingId: number | null = null;
  editingText = '';

  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faSave = faSave;
  faTimes = faTimes;

  constructor(private quoteService: QuoteService) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.quoteService.getQuotes().subscribe({
      next: (data) => (this.quotes = data),
      error: (err) => console.error('Failed to load quotes', err),
    });
  }

  onAdd(): void {
    if (!this.newQuoteText.trim()) return;

    this.quoteService.createQuote({ text: this.newQuoteText }).subscribe({
      next: (quote) => {
        this.quotes.push(quote);
        this.newQuoteText = '';
      },
      error: (err) => console.error('Failed to add quote', err),
    });
  }

  startEdit(quote: Quote): void {
    this.editingId = quote.id;
    this.editingText = quote.text;
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editingText = '';
  }

  saveEdit(quote: Quote): void {
    const updated = { ...quote, text: this.editingText };

    this.quoteService.updateQuote(quote.id, updated).subscribe({
      next: () => {
        quote.text = this.editingText;
        this.cancelEdit();
      },
      error: (err) => console.error('Failed to update quote', err),
    });
  }

  onDelete(id: number): void {
    if (!confirm('Delete this quote?')) return;

    this.quoteService.deleteQuote(id).subscribe({
      next: () => {
        this.quotes = this.quotes.filter((q) => q.id !== id);
      },
      error: (err) => console.error('Failed to delete quote', err),
    });
  }
}
