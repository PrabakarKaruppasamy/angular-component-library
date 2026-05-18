import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PkInputComponent } from '../../../../projects/pk-ui/src/public-api';

@Component({
  selector: 'app-inputs-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PkInputComponent],
  template: `
    <h1 style="font-size:24px;font-weight:700;margin-bottom:6px;">Input</h1>
    <p style="color:#4a5568;font-size:14px;margin-bottom:28px;">
      Fully accessible input with ControlValueAccessor — works with reactive forms and ngModel.
    </p>

    <div class="section">
      <p class="section-title">Basic Variants</p>
      <div class="col" style="max-width:420px">
        <pk-input label="Full Name" placeholder="John Doe" leftIcon="person" />
        <pk-input label="Email" type="email" placeholder="you@company.com" leftIcon="email" hint="We'll never share your email." />
        <pk-input label="Password" type="password" placeholder="••••••••" leftIcon="lock" />
        <pk-input label="Search" type="search" placeholder="Search..." leftIcon="search" rightIcon="tune" />
      </div>
    </div>

    <div class="section">
      <p class="section-title">Sizes</p>
      <div class="col" style="max-width:420px">
        <pk-input label="Small" size="sm" placeholder="Small input" />
        <pk-input label="Medium" size="md" placeholder="Medium input" />
        <pk-input label="Large" size="lg" placeholder="Large input" />
      </div>
    </div>

    <div class="section">
      <p class="section-title">States</p>
      <div class="col" style="max-width:420px">
        <pk-input label="With Error" error="This field is required." leftIcon="warning" />
        <pk-input label="With Character Count" [maxlength]="100" placeholder="Max 100 chars..." />
        <pk-input label="Required Field" [required]="true" placeholder="Required" />
      </div>
    </div>

    <div class="section">
      <p class="section-title">Reactive Form Integration</p>
      <form [formGroup]="form" style="max-width:420px; display:flex; flex-direction:column; gap:12px;">
        <pk-input label="Username" formControlName="username" leftIcon="person"
          [error]="form.get('username')?.invalid && form.get('username')?.touched ? 'Username is required' : ''" />
        <pk-input label="Email" type="email" formControlName="email" leftIcon="email"
          [error]="form.get('email')?.invalid && form.get('email')?.touched ? 'Valid email required' : ''" />
      </form>
    </div>

    <div class="section">
      <p class="section-title">Usage</p>
      <pre>{{ code }}</pre>
    </div>
  `
})
export class InputsDemoComponent {
  form: FormGroup;
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  code = `import { PkInputComponent } from '@prabakar/pk-ui';

<!-- Standalone -->
<pk-input label="Email" type="email" leftIcon="email" hint="We'll never share this." />

<!-- With reactive forms -->
<pk-input label="Username" formControlName="username"
  [error]="usernameCtrl.invalid ? 'Required' : ''" />`;
}
