# 🧩 PK-UI — Angular 18 Component Library

> **Enterprise Angular UI Component Library** — 10 production-ready standalone components, fully typed, accessible, OnPush change detection, ControlValueAccessor form integration, and publishable to NPM via ng-packagr.

[![Angular](https://img.shields.io/badge/Angular-18-DD0031?style=flat-square&logo=angular)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-007ACC?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![NPM](https://img.shields.io/badge/NPM-@prabakar%2Fpk--ui-CB3837?style=flat-square&logo=npm)](https://npmjs.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 📦 Components

| Component | Selector | Description |
|---|---|---|
| Button | `<pk-button>` | 8 variants, 3 sizes, loading, icons, full-width |
| Input | `<pk-input>` | CVA, icons, error, hint, char count, password toggle |
| Badge | `<pk-badge>` | 5 colors, dot, outline, icon, pill/square |
| Alert | `<pk-alert>` | Dismissible, 4 types, animated entry |
| Toast | `<pk-toast-container>` + `PkToastService` | 6 positions, auto-dismiss, progress bar |
| Modal | `<pk-modal>` | 4 sizes, ESC close, backdrop close, footer slot |
| Table | `<pk-table>` | Sort, search, paginate, row click, custom formatter |
| Card | `<pk-card>` | Icon, image, header, footer slot, hoverable |
| Accordion | `<pk-accordion>` | Single/multi open, animated, disabled items |
| Tabs | `<pk-tabs>` | Line/pill/boxed variants, icons, badges, disabled |

---

## 🚀 Getting Started

### Run Demo App
```bash
cd angular-component-library
npm install
ng serve
# Navigate to http://localhost:4200
```

### Build the Library
```bash
ng build pk-ui
# Output: dist/pk-ui/
```

### Publish to NPM
```bash
ng build pk-ui --configuration production
cd dist/pk-ui
npm publish --access public
```

### Install in another Angular project
```bash
npm install @prabakar/pk-ui
```

---

## 🔧 Usage

```typescript
// app.component.ts
import { PkButtonComponent, PkInputComponent, PkToastService } from '@prabakar/pk-ui';

@Component({
  standalone: true,
  imports: [PkButtonComponent, PkInputComponent]
})
export class AppComponent {
  constructor(private toast: PkToastService) {}

  save() {
    this.toast.success('Changes saved!');
  }
}
```

```html
<!-- app.component.html -->
<pk-button variant="primary" [loading]="saving" (clicked)="save()">
  Save Changes
</pk-button>

<pk-input label="Email" type="email" leftIcon="email"
          formControlName="email"
          [error]="emailCtrl.invalid ? 'Valid email required' : ''" />

<pk-toast-container position="top-right" />
```

---

## 🏗️ Architecture

```
projects/pk-ui/
├── src/
│   ├── lib/
│   │   ├── button/        # PkButtonComponent
│   │   ├── input/         # PkInputComponent (ControlValueAccessor)
│   │   ├── badge/         # PkBadgeComponent
│   │   ├── alert/         # PkAlertComponent
│   │   ├── toast/         # PkToastContainerComponent + PkToastService
│   │   ├── modal/         # PkModalComponent
│   │   ├── table/         # PkTableComponent<T>
│   │   ├── card/          # PkCardComponent
│   │   ├── accordion/     # PkAccordionComponent
│   │   ├── tabs/          # PkTabsComponent
│   │   └── shared/        # Types: PkSize, PkVariant, PkColor...
│   └── public-api.ts      # Single entry point — all exports
├── ng-package.json        # ng-packagr config
├── package.json           # NPM metadata for publishing
└── tsconfig.lib.prod.json # Partial compilation for APF output
```

### Key Engineering Patterns

| Pattern | Implementation |
|---|---|
| **Standalone Components** | All components — no NgModules required |
| **OnPush Change Detection** | Every component — optimal performance |
| **ControlValueAccessor** | `PkInputComponent` — full reactive forms support |
| **Angular Signals** | `PkToastService`, `PkAccordionComponent`, state management |
| **Content Projection** | Modal footer slot, Card footer slot via `ng-content select` |
| **Generic Types** | `PkTableComponent<T>` — fully typed row data and column formatters |
| **Host Listeners** | Modal ESC key handler via `host: { '(document:keydown.escape)': 'onEsc()' }` |
| **Angular Package Format** | ng-packagr, FESM2022, partial compilation, tree-shakeable |

---

## ♿ Accessibility

- All interactive elements have `aria-label`, `role`, and keyboard support
- Modal uses `role="dialog"` and `aria-modal="true"`
- Table uses `aria-sort` on sortable columns
- Alert uses `role="alert"` for screen reader announcements
- Toast container uses `aria-live="polite"`
- Inputs use `aria-invalid`, `aria-describedby` for error linking

---

## 👤 Author

**Prabakar Karuppasamy** — Frontend Architect & Technical Lead  
14+ years building enterprise Angular applications at BNP Paribas and Bank of America.  
Delivered reusable Angular component libraries adopted across 3+ product squads.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-prabakarsamy-0077B5?style=flat-square&logo=linkedin)](https://linkedin.com/in/prabakarsamy)
[![GitHub](https://img.shields.io/badge/GitHub-PrabakarKaruppasamy-333?style=flat-square&logo=github)](https://github.com/PrabakarKaruppasamy)

> ⭐ Star this repo if it helped you — it helps others find it!
