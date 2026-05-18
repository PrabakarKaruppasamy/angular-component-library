import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PkTableComponent, PkModalComponent, PkButtonComponent, PkBadgeComponent, PkTableColumn } from '../../../../projects/pk-ui/src/public-api';

interface Employee {
  id: number; name: string; department: string; role: string;
  status: string; salary: number; joined: string;
}

@Component({
  selector: 'app-data-demo',
  standalone: true,
  imports: [CommonModule, PkTableComponent, PkModalComponent, PkButtonComponent, PkBadgeComponent],
  template: `
    <h1 style="font-size:24px;font-weight:700;margin-bottom:6px;">Data Display</h1>
    <p style="color:#4a5568;font-size:14px;margin-bottom:28px;">Sortable, filterable, paginated Table and accessible Modal.</p>

    <div class="section">
      <p class="section-title">Table — Sortable · Searchable · Paginated</p>
      <pk-table [data]="employees" [columns]="columns" [paginate]="true" [pageSize]="5" [searchable]="true"
                caption="Employee Directory" (rowClicked)="openRow($event)" />
      <p style="font-size:12px;color:#4a5568;margin-top:8px;">💡 Click any row to open in modal</p>
    </div>

    <div class="section">
      <p class="section-title">Modal — Sizes & Keyboard Accessible</p>
      <div class="row">
        <pk-button variant="primary"   (clicked)="modalSize.set('sm'); showModal.set(true)">Small Modal</pk-button>
        <pk-button variant="secondary" (clicked)="modalSize.set('md'); showModal.set(true)">Medium Modal</pk-button>
        <pk-button variant="outline"   (clicked)="modalSize.set('lg'); showModal.set(true)">Large Modal</pk-button>
      </div>
    </div>

    <!-- Row detail modal -->
    <pk-modal [(open)]="showRowModal" title="Employee Details" size="md">
      <div *ngIf="selectedRow()" style="display:flex;flex-direction:column;gap:12px;">
        <div *ngFor="let col of columns" style="display:flex;gap:12px;font-size:14px;">
          <span style="font-weight:600;color:#a0aec0;min-width:100px;">{{ col.label }}</span>
          <span>{{ selectedRow()![col.key] }}</span>
        </div>
      </div>
      <ng-container pk-modal-footer>
        <pk-button variant="ghost" (clicked)="showRowModal.set(false)">Close</pk-button>
      </ng-container>
    </pk-modal>

    <!-- Size demo modal -->
    <pk-modal [(open)]="showModal" [title]="modalSize() + ' Modal'" [size]="modalSize()">
      <p>This is a <strong>{{ modalSize() }}</strong> modal. Press <code>ESC</code> or click the backdrop to close.</p>
      <p style="margin-top:8px;">Supports content projection via <code>pk-modal-footer</code> slot.</p>
      <ng-container pk-modal-footer>
        <pk-button variant="primary" (clicked)="showModal.set(false)">Confirm</pk-button>
        <pk-button variant="ghost"   (clicked)="showModal.set(false)">Cancel</pk-button>
      </ng-container>
    </pk-modal>
  `
})
export class DataDemoComponent {
  showModal    = signal(false);
  showRowModal = signal(false);
  modalSize    = signal<any>('md');
  selectedRow  = signal<Employee | null>(null);

  columns: PkTableColumn<Employee>[] = [
    { key: 'name',       label: 'Name',       sortable: true },
    { key: 'department', label: 'Department',  sortable: true },
    { key: 'role',       label: 'Role',        sortable: true },
    { key: 'status',     label: 'Status',      sortable: true },
    { key: 'salary',     label: 'Salary',      sortable: true, align: 'right', formatter: (v) => `$${Number(v).toLocaleString()}` },
    { key: 'joined',     label: 'Joined',      sortable: true },
  ];

  employees: Employee[] = [
    { id:1,  name:'Prabakar Karuppasamy', department:'Engineering', role:'Tech Lead',       status:'Active',   salary:120000, joined:'2020-01-15' },
    { id:2,  name:'Sarah Johnson',        department:'Engineering', role:'Senior Dev',      status:'Active',   salary:95000,  joined:'2021-03-20' },
    { id:3,  name:'Alex Chen',            department:'Product',     role:'Product Manager', status:'Active',   salary:110000, joined:'2019-08-10' },
    { id:4,  name:'Maya Patel',           department:'Design',      role:'UX Designer',     status:'Active',   salary:88000,  joined:'2022-01-05' },
    { id:5,  name:'James Williams',       department:'Engineering', role:'DevOps',          status:'Leave',    salary:92000,  joined:'2020-11-30' },
    { id:6,  name:'Priya Sharma',         department:'QA',          role:'QA Lead',         status:'Active',   salary:85000,  joined:'2021-07-15' },
    { id:7,  name:'Carlos Rivera',        department:'Engineering', role:'Frontend Dev',    status:'Active',   salary:87000,  joined:'2023-02-01' },
    { id:8,  name:'Emma Thompson',        department:'HR',          role:'HR Manager',      status:'Inactive', salary:78000,  joined:'2018-05-20' },
  ];

  openRow(row: Employee): void {
    this.selectedRow.set(row);
    this.showRowModal.set(true);
  }
}
