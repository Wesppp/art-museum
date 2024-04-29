import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  effect,
  input,
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  total_pages = input.required<number>();
  page = input<number>(1);
  totalPagesToShow = input<number>(4);

  @Output() changePageEvent = new EventEmitter<number>();

  constructor() {
    effect(
      () => {
        this.page();

        this.page;
      },
      { allowSignalWrites: true }
    );
  }

  getDisplayedPages(): number[] {
    const startPage = Math.max(
      1,
      Math.min(
        this.page() - Math.floor(this.totalPagesToShow() / 2),
        this.total_pages() - this.totalPagesToShow() + 1
      )
    );
    const endPage = Math.min(
      startPage + this.totalPagesToShow() - 1,
      this.total_pages()
    );

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  changePage(value: number): void {
    const newPage = this.page() + value;

    if (newPage >= 1 && newPage <= this.total_pages()) {
      this.onSelectPage(newPage);
    }
  }

  onSelectPage(page: number): void {
    this.changePageEvent.emit(page);
  }
}
