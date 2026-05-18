import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * PkCardComponent — Flexible content card with optional header, footer, image.
 *
 * Usage:
 *   <pk-card title="Revenue" subtitle="Q1 2024" [hoverable]="true">
 *     <p>Content goes here</p>
 *     <ng-container pk-card-footer>
 *       <pk-button variant="primary">View</pk-button>
 *     </ng-container>
 *   </pk-card>
 */
@Component({
  selector: 'pk-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class PkCardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() icon = '';
  @Input() iconColor = '#4a90d9';
  @Input() image = '';
  @Input() imageAlt = '';
  @Input() hoverable = false;
  @Input() flat = false;
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
}
