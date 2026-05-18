import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', redirectTo: 'buttons', pathMatch: 'full' },
  { path: 'buttons',   loadComponent: () => import('./pages/buttons-demo/buttons-demo.component').then(m => m.ButtonsDemoComponent) },
  { path: 'inputs',    loadComponent: () => import('./pages/inputs-demo/inputs-demo.component').then(m => m.InputsDemoComponent) },
  { path: 'feedback',  loadComponent: () => import('./pages/feedback-demo/feedback-demo.component').then(m => m.FeedbackDemoComponent) },
  { path: 'data',      loadComponent: () => import('./pages/data-demo/data-demo.component').then(m => m.DataDemoComponent) },
  { path: 'layout',    loadComponent: () => import('./pages/layout-demo/layout-demo.component').then(m => m.LayoutDemoComponent) },
  { path: '**', redirectTo: 'buttons' }
];
