import { Component, Input, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PkAccordionItem } from '../shared/types';

/**
 * PkAccordionComponent — Collapsible content sections.
 *
 * Usage:
 *   <pk-accordion [items]="faqItems" [multi]="false" />
 */
@Component({
  selector: 'pk-accordion',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class PkAccordionComponent {
  @Input() items: PkAccordionItem[] = [];
  @Input() multi = false;   // Allow multiple open at once

  openIds = signal<Set<string>>(new Set());

  toggle(id: string): void {
    this.openIds.update(set => {
      const next = new Set(this.multi ? set : new Set<string>());
      if (set.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  }

  isOpen(id: string): boolean { return this.openIds().has(id); }
}
