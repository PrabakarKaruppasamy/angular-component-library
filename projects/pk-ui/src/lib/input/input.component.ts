import {
  Component, Input, Output, EventEmitter, forwardRef,
  ChangeDetectionStrategy, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { PkSize } from '../shared/types';

/**
 * PkInputComponent — Accessible form input with CVA support.
 * Works with both [(ngModel)] and reactive FormControl.
 *
 * Usage:
 *   <pk-input label="Email" type="email" placeholder="you@company.com"
 *             leftIcon="email" [formControl]="emailCtrl" />
 */
@Component({
  selector: 'pk-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PkInputComponent), multi: true }],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class PkInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url' = 'text';
  @Input() size: PkSize = 'md';
  @Input() hint = '';
  @Input() error = '';
  @Input() leftIcon = '';
  @Input() rightIcon = '';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() maxlength: number | null = null;
  @Input() id = `pk-input-${Math.random().toString(36).slice(2, 9)}`;

  @Output() valueChange = new EventEmitter<string>();
  @Output() inputBlur   = new EventEmitter<FocusEvent>();
  @Output() inputFocus  = new EventEmitter<FocusEvent>();

  value = signal('');
  focused = signal(false);
  showPassword = signal(false);

  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(val: string): void    { this.value.set(val ?? ''); }
  registerOnChange(fn: (v: string) => void): void  { this.onChange = fn; }
  registerOnTouched(fn: () => void): void           { this.onTouched = fn; }
  setDisabledState(disabled: boolean): void         { this.disabled = disabled; }

  onInput(e: Event): void {
    const v = (e.target as HTMLInputElement).value;
    this.value.set(v);
    this.onChange(v);
    this.valueChange.emit(v);
  }

  onFocus(e: FocusEvent): void  { this.focused.set(true);  this.inputFocus.emit(e); }
  onBlur(e: FocusEvent): void   { this.focused.set(false); this.onTouched(); this.inputBlur.emit(e); }

  get effectiveType(): string {
    if (this.type === 'password') return this.showPassword() ? 'text' : 'password';
    return this.type;
  }

  get charCount(): string {
    return this.maxlength ? `${this.value().length} / ${this.maxlength}` : '';
  }
}
