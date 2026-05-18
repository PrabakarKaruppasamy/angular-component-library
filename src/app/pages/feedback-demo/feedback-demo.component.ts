import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PkBadgeComponent, PkAlertComponent, PkToastContainerComponent, PkToastService, PkButtonComponent } from '../../../../projects/pk-ui/src/public-api';

@Component({
  selector: 'app-feedback-demo',
  standalone: true,
  imports: [CommonModule, PkBadgeComponent, PkAlertComponent, PkButtonComponent],
  template: `
    <h1 style="font-size:24px;font-weight:700;margin-bottom:6px;">Feedback</h1>
    <p style="color:#4a5568;font-size:14px;margin-bottom:28px;">Badge, Alert, and Toast notification components.</p>

    <!-- Badges -->
    <div class="section">
      <p class="section-title">Badge — Colors</p>
      <div class="row">
        <pk-badge color="primary">Primary</pk-badge>
        <pk-badge color="success">Success</pk-badge>
        <pk-badge color="danger">Danger</pk-badge>
        <pk-badge color="warning">Warning</pk-badge>
        <pk-badge color="info">Info</pk-badge>
      </div>
      <p class="section-title" style="margin-top:16px">Badge — Variants</p>
      <div class="row">
        <pk-badge color="success" [dot]="true">Live</pk-badge>
        <pk-badge color="danger"  [dot]="true">Error</pk-badge>
        <pk-badge color="primary" [pill]="false">Square</pk-badge>
        <pk-badge color="success" [outline]="true">Outline</pk-badge>
        <pk-badge color="warning" icon="warning">With Icon</pk-badge>
        <pk-badge color="primary" size="sm">Small</pk-badge>
        <pk-badge color="primary" size="lg">Large</pk-badge>
      </div>
    </div>

    <!-- Alerts -->
    <div class="section">
      <p class="section-title">Alert</p>
      <div class="col">
        <pk-alert color="success" title="Saved Successfully">Your changes have been saved and will take effect immediately.</pk-alert>
        <pk-alert color="danger"  title="Authentication Failed">Invalid credentials. Please check your email and password.</pk-alert>
        <pk-alert color="warning" title="Approaching Limit" [dismissible]="true">You've used 80% of your API quota this month.</pk-alert>
        <pk-alert color="info"    title="Maintenance Window">Scheduled maintenance on Sunday 02:00–04:00 UTC.</pk-alert>
      </div>
    </div>

    <!-- Toast -->
    <div class="section">
      <p class="section-title">Toast — Trigger via PkToastService</p>
      <div class="row">
        <pk-button variant="success" leftIcon="check_circle" (clicked)="toast.success('Changes saved!', 'Success')">Success Toast</pk-button>
        <pk-button variant="danger"  leftIcon="error"        (clicked)="toast.danger('Something went wrong.', 'Error')">Error Toast</pk-button>
        <pk-button variant="warning" leftIcon="warning"      (clicked)="toast.warning('Low disk space.', 'Warning')">Warning Toast</pk-button>
        <pk-button variant="info"    leftIcon="info"         (clicked)="toast.info('New version available.', 'Info')">Info Toast</pk-button>
      </div>
      <pre style="margin-top:16px">{{ toastCode }}</pre>
    </div>
  `
})
export class FeedbackDemoComponent {
  constructor(public toast: PkToastService) {}
  toastCode = `// Inject PkToastService anywhere:
constructor(private toast: PkToastService) {}

this.toast.success('Changes saved!');
this.toast.danger('Something went wrong.');
this.toast.warning('Low disk space.');
this.toast.info('New update available.');

// Add <pk-toast-container position="top-right" /> once in AppComponent`;
}
