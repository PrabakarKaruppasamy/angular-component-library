import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PkColor } from '../shared/types';

/**
 * PkAlertComponent — Contextual alert / banner
 *
 * Usage:
 *   <pk-alert color="success" title="Saved!" [dismissible]="true">
 *     Your changes have been saved successfully.
 *   </pk-alert>
 */
@Component({
  selector: 'pk-alert',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class PkAlertComponent {
  @Input() color: PkColor = 'info';
  @Input() title = '';
  @Input() dismissible = false;
  @Input() icon = '';
  @Output() dismissed = new EventEmitter<void>();

  visible = signal(true);

  dismiss(): void {
    this.visible.set(false);
    this.dismissed.emit();
  }

  get defaultIcon(): string {
    const icons: Record<PkColor, string> = {
      primary: 'info',
      success: 'check_circle',
      danger:  'error',
      warning: 'warning',
      info:    'info'
    };
    return this.icon || icons[this.color];
  }
}
