import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CreateCompanyDialogComponent } from '../dialogs/create-company-dialog/create-company-dialog.component';
import { UpdateCompanyDialogComponent } from '../dialogs/update-company-dialog/update-company-dialog.component';
import { Company } from '../../models/company';

import { CompanyService } from '../../services/company.service';

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
  companies: Company[] = [];

  constructor(
    private dialog: MatDialog,
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.fetchCompanies();
  }

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

  openUpdateDialog(company: Company) {
    const dialogRef = this.dialog.open(UpdateCompanyDialogComponent, {
      width: '400px',
      data: { ...company },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onUpdateCompany(result);
      }
    });
  }

  fetchCompanies() {
    console.log('Fetching companies...');
    this.companyService.getCompanies().subscribe({
      next: (response: Company[]) => {
        this.companies = response;
      },
      error: (error: any) => {
        console.error('Error fetching companies:', error);
      },
    });
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
