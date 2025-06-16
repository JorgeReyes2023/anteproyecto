import { Component, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartType,
  ChartData
} from 'chart.js';
import { MatCardModule } from '@angular/material/card';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [BaseChartDirective, MatCardModule, CommonModule],
})
export class DashboardComponent {
  isBrowser = isPlatformBrowser(inject(Platform));
  // Line Chart
  public lineChartType: ChartType = 'line';
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        data: [10, 20, 30, 40],
        label: 'Ventes',
        fill: true,
        tension: 0.4,
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63,81,181,0.3)',
      },
    ],
  };
  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
  };

  // Bar Chart
  public barChartType: ChartType = 'bar';
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['A', 'B', 'C', 'D'],
    datasets: [
      {
        data: [12, 19, 3, 5],
        label: 'Produits',
        backgroundColor: '#4caf50',
      },
    ],
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  // Pie Chart
  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Chrome', 'Firefox', 'Edge'],
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
      },
    ],
  };
  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
  };

  // Statistiques
  public totalUsers = 120;
  public activeSessions = 34;
  public conversionRate = 7.3;
}
