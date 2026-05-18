import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PkToastService } from './toast.service';
import { PkPosition } from '../shared/types';

/**
 * PkToastContainerComponent — Add once to AppComponent, then inject PkToastService anywhere.
 *
 * Usage in app.component.html:
 *   <pk-toast-container position="top-right" />
 *
 * Trigger from any component:
 *   this.toast.success('Changes saved!');
 *   this.toast.danger('Something went wrong');
 */
@Component({
  selector: 'pk-toast-container',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class PkToastContainerComponent {
  @Input() position: PkPosition = 'top-right';

  constructor(public toastService: PkToastService) {}

  get iconMap(): Record<string, string> {
    return { primary: 'info', success: 'check_circle', danger: 'error', warning: 'warning', info: 'notifications' };
  }

  trackById(_: number, t: { id: string }): string { return t.id; }
}
