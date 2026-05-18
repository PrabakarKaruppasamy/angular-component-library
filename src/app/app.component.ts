import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PkToastContainerComponent } from '../../projects/pk-ui/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, PkToastContainerComponent],
  template: `
    <div class="shell">
      <aside class="sidebar">
        <div class="brand">
          <span class="brand-icon">🧩</span>
          <div>
            <p class="brand-name">PK-UI</p>
            <p class="brand-sub">v1.0.0 · Angular 18</p>
          </div>
        </div>
        <nav class="nav">
          <p class="nav-group">Components</p>
          <a *ngFor="let item of navItems" class="nav-item" [routerLink]="item.route" routerLinkActive="active">
            <span class="material-icons">{{ item.icon }}</span>{{ item.label }}
          </a>
        </nav>
        <div class="sidebar-footer">
          <a href="https://github.com/PrabakarKaruppasamy/angular-component-library" target="_blank" class="github-btn">
            <span class="material-icons">code</span> GitHub
          </a>
          <p class="author">by Prabakar Karuppasamy</p>
        </div>
      </aside>
      <main class="content">
        <router-outlet />
      </main>
    </div>
    <pk-toast-container position="top-right" />
  `,
  styles: [`
    .shell { display: flex; min-height: 100vh; }
    .sidebar {
      width: 220px; flex-shrink: 0;
      background: #111c2d; border-right: 1px solid #2d3748;
      display: flex; flex-direction: column;
      position: sticky; top: 0; height: 100vh; overflow-y: auto;
    }
    .brand { display: flex; align-items: center; gap: 10px; padding: 20px 16px; border-bottom: 1px solid #2d3748; }
    .brand-icon { font-size: 28px; }
    .brand-name { font-size: 18px; font-weight: 800; color: #4a90d9; }
    .brand-sub  { font-size: 10px; color: #4a5568; }
    .nav { flex: 1; padding: 16px 8px; }
    .nav-group { font-size: 10px; font-weight: 700; color: #4a5568; text-transform: uppercase; letter-spacing: 1px; padding: 4px 8px 8px; }
    .nav-item {
      display: flex; align-items: center; gap: 8px; padding: 9px 10px;
      border-radius: 8px; font-size: 14px; font-weight: 500;
      color: #a0aec0; text-decoration: none; margin-bottom: 2px;
      transition: all .2s;
      &:hover { background: rgba(255,255,255,0.05); color: #e2e8f0; }
      &.active { background: rgba(74,144,217,0.12); color: #4a90d9; }
      .material-icons { font-size: 18px; }
    }
    .sidebar-footer { padding: 16px; border-top: 1px solid #2d3748; }
    .github-btn {
      display: flex; align-items: center; gap: 6px; padding: 8px 12px;
      background: rgba(255,255,255,0.05); border-radius: 8px;
      color: #a0aec0; text-decoration: none; font-size: 13px; font-weight: 500;
      transition: all .2s; margin-bottom: 8px;
      &:hover { background: rgba(255,255,255,0.08); color: #fff; }
      .material-icons { font-size: 16px; }
    }
    .author { font-size: 11px; color: #4a5568; text-align: center; }
    .content { flex: 1; padding: 32px; min-width: 0; max-width: 900px; }
  `]
})
export class AppComponent {
  navItems = [
    { label: 'Buttons',        icon: 'smart_button',  route: '/buttons' },
    { label: 'Inputs',         icon: 'input',         route: '/inputs' },
    { label: 'Feedback',       icon: 'notifications', route: '/feedback' },
    { label: 'Data Display',   icon: 'table_chart',   route: '/data' },
    { label: 'Layout',         icon: 'dashboard',     route: '/layout' },
  ];
}
