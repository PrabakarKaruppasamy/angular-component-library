import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PkSize } from '../shared/types';

/**
 * PkModalComponent — Accessible dialog/modal with backdrop, focus trap, ESC close.
 *
 * Usage:
 *   <pk-modal [(open)]="showModal" title="Confirm Delete" size="md">
 *     <p>Are you sure you want to delete this item?</p>
 *     <ng-container pk-modal-footer>
 *       <pk-button variant="danger" (clicked)="onConfirm()">Delete</pk-button>
 *       <pk-button variant="ghost"  (clicked)="showModal = false">Cancel</pk-button>
 *     </ng-container>
 *   </pk-modal>
 */
@Component({
  selector: 'pk-modal',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  host: { '(document:keydown.escape)': 'onEsc()' }
})
export class PkModalComponent {
  @Input() open = false;
  @Input() title = '';
  @Input() size: PkSize | 'xl' = 'md';
  @Input() closable = true;
  @Input() backdropClose = true;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() closed     = new EventEmitter<void>();

  close(): void {
    if (!this.closable) return;
    this.open = false;
    this.openChange.emit(false);
    this.closed.emit();
  }

  onBackdrop(): void { if (this.backdropClose) this.close(); }
  onEsc():      void { if (this.open) this.close(); }
}
