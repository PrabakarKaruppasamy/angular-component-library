import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PkColor, PkSize } from '../shared/types';

/**
 * PkBadgeComponent — Status badge / label chip
 *
 * Usage:
 *   <pk-badge color="success" size="md" [dot]="true">Active</pk-badge>
 *   <pk-badge color="danger" [pill]="false">Critical</pk-badge>
 */
@Component({
  selector: 'pk-badge',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="pk-badge"
      [class]="'pk-badge--' + color + ' pk-badge--' + size"
      [class.pk-badge--pill]="pill"
      [class.pk-badge--outline]="outline"
      [attr.aria-label]="ariaLabel">
      <span class="pk-badge__dot" *ngIf="dot" aria-hidden="true"></span>
      <span class="material-icons pk-badge__icon" *ngIf="icon">{{ icon }}</span>
      <ng-content />
    </span>
  `,
  styleUrls: ['./badge.component.scss']
})
export class PkBadgeComponent {
  @Input() color: PkColor = 'primary';
  @Input() size: PkSize = 'md';
  @Input() pill = true;
  @Input() outline = false;
  @Input() dot = false;
  @Input() icon = '';
  @Input() ariaLabel = '';
}
