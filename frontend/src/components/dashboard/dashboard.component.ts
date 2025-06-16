import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';             // Pour les graphiques
import { MatCardModule } from '@angular/material/card';   // Pour <mat-card>
import { isPlatformBrowser } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [MatCardModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isBrowser: boolean; 
  totalUsers = 2450;
  activeSessions = 312;
  conversionRate = 7.8;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
}
