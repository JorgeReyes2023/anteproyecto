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

  addCompany(company: Omit<Company, 'id'>) {
    this.companyService.createCompany(company).subscribe({
      next: (response) => {
        console.log('Company created successfully:', response);
        this.fetchCompanies();
      },
      error: (error) => {
        console.error('Error creating company:', error);
      },
    });
  }

  trackByCompanyId(index: number, company: Company): number {
    return company.id;
  }

  onUpdateCompany(company: Company) {
    this.companyService.updateCompany(company).subscribe({
      next: (response) => {
        console.log('Company updated successfully:', response);
        this.fetchCompanies();
      },
      error: (error) => {
        console.error('Error updating company:', error);
      },
    });
  }

  onDelete(company: Pick<Company, 'id'>) {
    this.companyService.deleteCompany(company.id).subscribe({
      next: (response) => {
        console.log('Company deleted successfully:', response);
        this.fetchCompanies();
      },
      error: (error) => {
        console.error('Error deleting company:', error);
      },
    });
  }
}
