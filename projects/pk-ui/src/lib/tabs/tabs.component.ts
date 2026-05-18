import { Component, Input, Output, EventEmitter, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PkTab {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  badge?: string | number;
}

/**
 * PkTabsComponent — Tab navigation with content projection per tab.
 *
 * Usage:
 *   <pk-tabs [tabs]="myTabs" [(activeId)]="activeTab">
 *     <div *ngIf="activeTab === 'overview'">Overview content</div>
 *     <div *ngIf="activeTab === 'settings'">Settings content</div>
 *   </pk-tabs>
 */
@Component({
  selector: 'pk-tabs',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class PkTabsComponent {
  @Input() tabs: PkTab[] = [];
  @Input() activeId = '';
  @Input() variant: 'line' | 'pill' | 'boxed' = 'line';
  @Output() activeIdChange = new EventEmitter<string>();
  @Output() tabChanged     = new EventEmitter<PkTab>();

  select(tab: PkTab): void {
    if (tab.disabled) return;
    this.activeId = tab.id;
    this.activeIdChange.emit(tab.id);
    this.tabChanged.emit(tab);
  }
}
