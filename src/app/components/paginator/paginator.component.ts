import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
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
  @Input({ required: true }) public total_pages!: number;
  @Input() public page: number = 1;
  @Input() public totalPagesToShow: number = 4;

  @Output() public changePageEvent = new EventEmitter<number>();

  public getDisplayedPages(): number[] {
    const startPage = Math.max(
      1,
      Math.min(
        this.page - Math.floor(this.totalPagesToShow / 2),
        this.total_pages - this.totalPagesToShow + 1
      )
    );
    const endPage = Math.min(
      startPage + this.totalPagesToShow - 1,
      this.total_pages
    );

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  public changePage(value: number): void {
    const newPage = this.page + value;

    if (newPage >= 1 && newPage <= this.total_pages) {
      this.page = newPage;

      this.onSelectPage(newPage);
    }
  }

  public onSelectPage(page: number): void {
    this.changePageEvent.emit(page);
  }
}
