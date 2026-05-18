import { Injectable, signal, computed } from '@angular/core';
import { PkToast, PkColor, PkPosition } from '../shared/types';

@Injectable({ providedIn: 'root' })
export class PkToastService {
  private _toasts = signal<PkToast[]>([]);
  readonly toasts = this._toasts.asReadonly();
  readonly count  = computed(() => this._toasts().length);

  show(message: string, type: PkColor = 'info', title = '', duration = 4000): string {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const toast: PkToast = { id, type, title, message, duration, dismissible: true };
    this._toasts.update(t => [...t, toast]);
    if (duration > 0) setTimeout(() => this.dismiss(id), duration);
    return id;
  }

  success(message: string, title = 'Success')  { return this.show(message, 'success', title); }
  danger(message: string,  title = 'Error')    { return this.show(message, 'danger',  title); }
  warning(message: string, title = 'Warning')  { return this.show(message, 'warning', title); }
  info(message: string,    title = 'Info')     { return this.show(message, 'info',    title); }

  dismiss(id: string): void {
    this._toasts.update(t => t.filter(x => x.id !== id));
  }

  clear(): void { this._toasts.set([]); }
}
