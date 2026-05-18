// ── Design Tokens ─────────────────────────────────────────────
export type PkSize     = 'sm' | 'md' | 'lg';
export type PkVariant  = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'ghost' | 'outline';
export type PkColor    = 'primary' | 'success' | 'danger' | 'warning' | 'info';
export type PkPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

// ── Table Types ────────────────────────────────────────────────

export interface PkTableColumn<T extends object> {
  key: Extract<keyof T, string>;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
  formatter?: (
    value: T[Extract<keyof T, string>],
    row: T
  ) => string;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface PkSortEvent {
  key: string;
  direction: SortDirection;
}

// ── Toast Types ────────────────────────────────────────────────
export interface PkToast {
  id: string;
  type: PkColor;
  title?: string;
  message: string;
  duration?: number;   // ms, 0 = persistent
  dismissible?: boolean;
}

// ── Accordion Types ────────────────────────────────────────────
export interface PkAccordionItem {
  id: string;
  title: string;
  content: string;
  disabled?: boolean;
}
