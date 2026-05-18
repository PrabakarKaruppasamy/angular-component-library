import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PkButtonComponent } from '../../../../projects/pk-ui/src/public-api';

@Component({
  selector: 'app-buttons-demo',
  standalone: true,
  imports: [CommonModule, PkButtonComponent],
  template: `
    <h1 style="font-size:24px;font-weight:700;margin-bottom:6px;">Button</h1>
    <p style="color:#4a5568;font-size:14px;margin-bottom:28px;">
      Versatile button with 8 variants, 3 sizes, loading state, icons, and full-width support.
    </p>

    <div class="section">
      <p class="section-title">Variants</p>
      <div class="row">
        <pk-button variant="primary">Primary</pk-button>
        <pk-button variant="secondary">Secondary</pk-button>
        <pk-button variant="success">Success</pk-button>
        <pk-button variant="danger">Danger</pk-button>
        <pk-button variant="warning">Warning</pk-button>
        <pk-button variant="info">Info</pk-button>
        <pk-button variant="outline">Outline</pk-button>
        <pk-button variant="ghost">Ghost</pk-button>
      </div>
    </div>

    <div class="section">
      <p class="section-title">Sizes</p>
      <div class="row" style="align-items:flex-end">
        <pk-button variant="primary" size="sm">Small</pk-button>
        <pk-button variant="primary" size="md">Medium</pk-button>
        <pk-button variant="primary" size="lg">Large</pk-button>
      </div>
    </div>

    <div class="section">
      <p class="section-title">With Icons</p>
      <div class="row">
        <pk-button variant="primary"   leftIcon="save">Save Changes</pk-button>
        <pk-button variant="success"   leftIcon="check">Approve</pk-button>
        <pk-button variant="danger"    rightIcon="delete">Delete</pk-button>
        <pk-button variant="secondary" leftIcon="download" rightIcon="arrow_drop_down">Export</pk-button>
      </div>
    </div>

    <div class="section">
      <p class="section-title">States</p>
      <div class="row">
        <pk-button variant="primary"  [loading]="isLoading()" (clicked)="simulateLoad()">
          {{ isLoading() ? 'Saving...' : 'Click to Load' }}
        </pk-button>
        <pk-button variant="primary"  [disabled]="true">Disabled</pk-button>
        <pk-button variant="outline"  [disabled]="true">Disabled Outline</pk-button>
      </div>
    </div>

    <div class="section">
      <p class="section-title">Full Width</p>
      <pk-button variant="primary" [fullWidth]="true" leftIcon="login">Sign In</pk-button>
    </div>

    <div class="section">
      <p class="section-title">Usage</p>
      <pre>{{ code }}</pre>
    </div>
  `
})
export class ButtonsDemoComponent {
  isLoading = signal(false);

  simulateLoad(): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 2000);
  }

  code = `import { PkButtonComponent } from '@prabakar/pk-ui';

<pk-button variant="primary" size="md" [loading]="loading" (clicked)="save()">
  Save Changes
</pk-button>

<pk-button variant="success" leftIcon="check">Approve</pk-button>
<pk-button variant="danger"  [disabled]="true">Disabled</pk-button>
<pk-button variant="primary" [fullWidth]="true">Full Width</pk-button>`;
}
