import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PkCardComponent, PkAccordionComponent, PkTabsComponent,
  PkButtonComponent, PkBadgeComponent, PkAccordionItem, PkTab
} from '../../../../projects/pk-ui/src/public-api';

@Component({
  selector: 'app-layout-demo',
  standalone: true,
  imports: [CommonModule, PkCardComponent, PkAccordionComponent, PkTabsComponent, PkButtonComponent, PkBadgeComponent],
  template: `
    <h1 style="font-size:24px;font-weight:700;margin-bottom:6px;">Layout</h1>
    <p style="color:#4a5568;font-size:14px;margin-bottom:28px;">Card, Accordion, and Tabs layout components.</p>

    <!-- Cards -->
    <div class="section">
      <p class="section-title">Card — Variants</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">
        <pk-card title="Total Revenue" subtitle="Q1 2024" icon="payments" iconColor="#48bb78">
          <p style="font-size:28px;font-weight:700;color:#e2e8f0;margin:8px 0 4px;">$284,500</p>
          <pk-badge color="success" [dot]="true">+12.5% vs last quarter</pk-badge>
        </pk-card>
        <pk-card title="Active Users" subtitle="Last 30 days" icon="people" iconColor="#4a90d9">
          <p style="font-size:28px;font-weight:700;color:#e2e8f0;margin:8px 0 4px;">14,823</p>
          <pk-badge color="primary" [dot]="true">+8.3% growth</pk-badge>
        </pk-card>
        <pk-card title="Deployments" subtitle="This week" icon="rocket_launch" iconColor="#b794f4" [hoverable]="true">
          <p style="font-size:28px;font-weight:700;color:#e2e8f0;margin:8px 0 4px;">47</p>
          <pk-badge color="warning">3 pending</pk-badge>
          <ng-container pk-card-footer>
            <pk-button variant="outline" size="sm" leftIcon="visibility">View All</pk-button>
          </ng-container>
        </pk-card>
      </div>
    </div>

    <!-- Tabs -->
    <div class="section">
      <p class="section-title">Tabs — Line Variant</p>
      <pk-tabs [tabs]="lineTabs" [(activeId)]="activeLineTab">
        <div *ngIf="activeLineTab === 'overview'" style="color:#a0aec0;font-size:14px;line-height:1.7">
          <strong style="color:#e2e8f0">Overview Tab</strong> — General summary of the component's purpose,
          key features, and recommended use cases across your application.
        </div>
        <div *ngIf="activeLineTab === 'api'" style="color:#a0aec0;font-size:14px">
          <strong style="color:#e2e8f0">API Tab</strong> — Full input/output reference with types and defaults.
        </div>
        <div *ngIf="activeLineTab === 'examples'" style="color:#a0aec0;font-size:14px">
          <strong style="color:#e2e8f0">Examples Tab</strong> — Real-world usage examples with code snippets.
        </div>
        <div *ngIf="activeLineTab === 'changelog'" style="color:#a0aec0;font-size:14px">
          <strong style="color:#e2e8f0">Changelog Tab</strong> — Version history and breaking changes.
        </div>
      </pk-tabs>
    </div>

    <div class="section">
      <p class="section-title">Tabs — Pill Variant</p>
      <pk-tabs [tabs]="pillTabs" [(activeId)]="activePillTab" variant="pill">
        <div style="color:#a0aec0;font-size:14px;padding:4px 0">
          Active tab: <strong style="color:#4a90d9">{{ activePillTab }}</strong>
        </div>
      </pk-tabs>
    </div>

    <div class="section">
      <p class="section-title">Tabs — Boxed Variant</p>
      <pk-tabs [tabs]="boxedTabs" [(activeId)]="activeBoxedTab" variant="boxed">
        <div style="color:#a0aec0;font-size:14px;padding:4px 0">
          Active tab: <strong style="color:#4a90d9">{{ activeBoxedTab }}</strong>
        </div>
      </pk-tabs>
    </div>

    <!-- Accordion -->
    <div class="section">
      <p class="section-title">Accordion — Single Open</p>
      <pk-accordion [items]="faqItems" [multi]="false" />
    </div>

    <div class="section">
      <p class="section-title">Accordion — Multi Open</p>
      <pk-accordion [items]="faqItems" [multi]="true" />
    </div>
  `
})
export class LayoutDemoComponent {
  activeLineTab  = 'overview';
  activePillTab  = 'all';
  activeBoxedTab = 'daily';

  lineTabs: PkTab[] = [
    { id: 'overview',   label: 'Overview',   icon: 'info' },
    { id: 'api',        label: 'API',         icon: 'code' },
    { id: 'examples',   label: 'Examples',    icon: 'auto_stories', badge: 3 },
    { id: 'changelog',  label: 'Changelog',   icon: 'history', disabled: false },
  ];

  pillTabs: PkTab[] = [
    { id: 'all',     label: 'All' },
    { id: 'active',  label: 'Active',   badge: 12 },
    { id: 'pending', label: 'Pending',  badge: 4 },
    { id: 'closed',  label: 'Closed' },
  ];

  boxedTabs: PkTab[] = [
    { id: 'daily',   label: 'Daily',   icon: 'today' },
    { id: 'weekly',  label: 'Weekly',  icon: 'date_range' },
    { id: 'monthly', label: 'Monthly', icon: 'calendar_month' },
    { id: 'yearly',  label: 'Yearly',  icon: 'event_note', disabled: true },
  ];

  faqItems: PkAccordionItem[] = [
    { id: 'q1', title: 'What is ng-packagr and why is it used?',
      content: 'ng-packagr is the Angular CLI\'s tool for building Angular libraries into the Angular Package Format (APF). It handles secondary entrypoints, FESM bundles, and generates the metadata needed for tree-shaking in consumer applications.' },
    { id: 'q2', title: 'How does ChangeDetectionStrategy.OnPush improve performance?',
      content: 'OnPush tells Angular to skip change detection for a component unless its @Input references change, an async pipe emits, or an event originates from within the component. This dramatically reduces the number of dirty-checking cycles in large component trees.' },
    { id: 'q3', title: 'Why use ControlValueAccessor for form components?',
      content: 'CVA allows custom components to integrate seamlessly with Angular\'s reactive forms and template-driven forms. Without it, consumers must wire up custom event bindings manually. With CVA, the component just works with formControlName and [(ngModel)].' },
    { id: 'q4', title: 'What is the Angular Package Format (APF)?',
      content: 'APF is Anthropic\'s recommended output structure for Angular libraries. It includes FESM2022 bundles, UMD bundles, type declarations, and source maps — ensuring optimal tree-shaking and compatibility across build tools.' },
    { id: 'q5', title: 'Can this library be used with Server-Side Rendering?',
      content: 'Yes. All components are SSR-safe — no direct DOM manipulation outside Angular\'s renderer. The library uses @angular/animations for transitions which is also compatible with Angular Universal and the new application builder\'s SSR mode.' },
  ];
}
