import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CreateCompanyDialogComponent } from '../dialogs/create-company-dialog/create-company-dialog.component';

@Component({
  selector: 'app-companies-data',
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './companies-data.component.html',
  styleUrls: ['./companies-data.component.css'],
})
export class CompaniesDataComponent {
  companies = [
    {
      id: 1,
      name: 'Tech Corp',
      address: 'address1',
      projects: [
        { id: 1, name: 'Project A', description: 'Description A' },
        { id: 2, name: 'Project B', description: 'Description B' },
      ],
    },
    { id: 2, name: 'Health Solutions', address: 'address2', projects: null },
    {
      id: 3,
      name: 'Finance Group',
      address: 'address3',
      projects: [
        { id: 3, name: 'Project C', description: 'Description C' },
        { id: 4, name: 'Project D', description: 'Description D' },
      ],
    },
  ];

  constructor(private dialog: MatDialog) {}

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateCompanyDialogComponent, {
      width: '400px',
      data: { name: '', address: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addCompany(result);
      }
    });
  }

  openUpdateDialog(company: { id: number; name: string; address: string }) {
    console.log('Opening update dialog for company:', company);
  }

  addCompany(company: { name: string; address: string }) {
    const newCompany = {
      id: this.companies.length + 1,
      name: company.name,
      address: company.address,
      projects: [],
    };
    this.companies.push(newCompany);
  }

  trackByCompanyId(index: number, company: { id: number }): number {
    return company.id;
  }

  onUpdateCompany(company: { id: number; name: string; address: string }) {
    const index = this.companies.findIndex((c) => c.id === company.id);
    if (index !== -1) {
      this.companies[index] = { ...this.companies[index], ...company };
      console.log('Update company:', company);
    }
  }
  onDelete(company: { id: number }) {
    this.companies = this.companies.filter((c) => c.id !== company.id);
    console.log('Delete company:', company);
  }
}
