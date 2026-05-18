import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PkSize, PkVariant } from '../shared/types';

/**
 * PkButtonComponent — Enterprise-grade button
 *
 * Usage:
 *   <pk-button variant="primary" size="md" (clicked)="doSomething()">
 *     Save Changes
 *   </pk-button>
 */
@Component({
  selector: 'pk-button',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="pk-btn"
      [class]="'pk-btn--' + variant + ' pk-btn--' + size"
      [class.pk-btn--loading]="loading"
      [class.pk-btn--full]="fullWidth"
      [class.pk-btn--icon-only]="iconOnly"
      [disabled]="disabled || loading"
      [attr.aria-busy]="loading"
      [attr.aria-label]="ariaLabel"
      [type]="type"
      (click)="!disabled && !loading && clicked.emit($event)">
      <span class="pk-btn__spinner" *ngIf="loading" aria-hidden="true"></span>
      <span class="pk-btn__icon pk-btn__icon--left" *ngIf="leftIcon && !loading" aria-hidden="true">
        <span class="material-icons">{{ leftIcon }}</span>
      </span>
      <span class="pk-btn__label" *ngIf="!iconOnly"><ng-content /></span>
      <span class="pk-btn__icon pk-btn__icon--right" *ngIf="rightIcon" aria-hidden="true">
        <span class="material-icons">{{ rightIcon }}</span>
      </span>
    </button>
  `,
  styleUrls: ['./button.component.scss']
})
export class PkButtonComponent {
  @Input() variant: PkVariant = 'primary';
  @Input() size: PkSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() iconOnly = false;
  @Input() leftIcon = '';
  @Input() rightIcon = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() ariaLabel = '';
  @Output() clicked = new EventEmitter<MouseEvent>();
}
