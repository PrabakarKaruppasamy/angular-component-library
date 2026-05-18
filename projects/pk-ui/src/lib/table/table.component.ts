import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  signal,
  computed
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  PkTableColumn,
  PkSortEvent,
  SortDirection
} from '../shared/types';

/**
 * PkTableComponent
 * Sortable, searchable, paginated enterprise table component.
 */
@Component({
  selector: 'pk-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PkTableComponent<T extends object = object> {

  // =========================
  // Inputs
  // =========================

  @Input()
  set data(value: T[]) {
    this._data.set(value ?? []);
    this.currentPage.set(1);
  }

  @Input() columns: PkTableColumn<T>[] = [];

  @Input() searchable = true;

  @Input() paginate = true;

  @Input() pageSize = 5;

  @Input() striped = true;

  @Input() hoverable = true;

  @Input() loading = false;

  @Input() emptyMessage = 'No data found';

  @Input() caption = '';

  // =========================
  // Outputs
  // =========================

  @Output() sortChanged = new EventEmitter<PkSortEvent>();

  @Output() rowClicked = new EventEmitter<T>();

  // =========================
  // State Signals
  // =========================

  private readonly _data = signal<T[]>([]);

  readonly searchTerm = signal('');

  readonly sortKey = signal<Extract<keyof T, string> | null>(null);

  readonly sortDir = signal<SortDirection>(null);

  readonly currentPage = signal(1);

  // =========================
  // Computed Data
  // =========================

  readonly filtered = computed(() => {

    let list = [...this._data()];

    // Search
    const term = this.searchTerm().trim().toLowerCase();

    if (term) {
      list = list.filter(row =>
        Object.values(row as Record<string, unknown>)
          .some(value =>
            String(value ?? '')
              .toLowerCase()
              .includes(term)
          )
      );
    }

    // Sort
    const key = this.sortKey();
    const dir = this.sortDir();

    if (key && dir) {

      const multiplier = dir === 'asc' ? 1 : -1;

      list.sort((a, b) => {

        const av = a[key];
        const bv = b[key];

        const aValue = String(av ?? '').toLowerCase();
        const bValue = String(bv ?? '').toLowerCase();

        if (aValue < bValue) return -1 * multiplier;
        if (aValue > bValue) return 1 * multiplier;

        return 0;
      });
    }

    return list;
  });

  readonly paginated = computed(() => {

    if (!this.paginate) {
      return this.filtered();
    }

    const start = (this.currentPage() - 1) * this.pageSize;

    return this.filtered().slice(start, start + this.pageSize);
  });

  readonly totalPages = computed(() =>
    Math.max(
      Math.ceil(this.filtered().length / this.pageSize),
      1
    )
  );

  readonly pageNumbers = computed(() =>
    Array.from(
      { length: this.totalPages() },
      (_, index) => index + 1
    )
  );

  // =========================
  // Sorting
  // =========================

  onSort(column: PkTableColumn<T>): void {

    if (!column.sortable) {
      return;
    }

    const currentKey = this.sortKey();
    const currentDir = this.sortDir();

    // Toggle same column
    if (currentKey === column.key) {

      if (currentDir === 'asc') {
        this.sortDir.set('desc');
      }
      else if (currentDir === 'desc') {
        this.sortDir.set(null);
        this.sortKey.set(null);
      }
      else {
        this.sortDir.set('asc');
      }
    }
    else {
      this.sortKey.set(column.key);
      this.sortDir.set('asc');
    }

    this.sortChanged.emit({
      key: String(this.sortKey() ?? ''),
      direction: this.sortDir()
    });

    this.currentPage.set(1);
  }

  sortIcon(key: Extract<keyof T, string>): string {

    if (this.sortKey() !== key) {
      return 'unfold_more';
    }

    return this.sortDir() === 'asc'
      ? 'arrow_upward'
      : 'arrow_downward';
  }

  // =========================
  // Cell Helpers
  // =========================

getCellValue(
  row: T,
  column: PkTableColumn<T>
): string {

  const key = column.key as Extract<keyof T, string>;

  const value = row[key];

  return column.formatter
    ? column.formatter(value as T[Extract<keyof T, string>], row)
    : String(value ?? '—');
}

  // =========================
  // Pagination
  // =========================

  setPage(page: number): void {

    if (page < 1 || page > this.totalPages()) {
      return;
    }

    this.currentPage.set(page);
  }

  // =========================
  // Range Info
  // =========================

  get rangeStart(): number {
    return ((this.currentPage() - 1) * this.pageSize) + 1;
  }

  get rangeEnd(): number {
    return Math.min(
      this.currentPage() * this.pageSize,
      this.filtered().length
    );
  }
}