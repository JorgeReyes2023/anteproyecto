import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChangeDetectorRef } from '@angular/core';

import { Platform } from '@angular/cdk/platform';

import { SensorService } from '../../services/sensor.service';
import { ReadingService } from '../../services/reading.service';
import { Subscription } from 'rxjs';

import { SensorType } from '../../models/sensor';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    BaseChartDirective,
    MatCardModule,
    CommonModule,
    MatListModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
})
export class DashboardComponent implements OnInit, OnDestroy {
  typesList: SensorType[] = [];
  selectedTypeId: number | null = null;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  /* ———————————————————————————————————————————————— */
  // ►  1) Injections
  private readingService = inject(ReadingService);
  private sensorService = inject(SensorService);
  private cdr = inject(ChangeDetectorRef);
  private platform = inject(Platform);

  /* ———————————————————————————————————————————————— */
  // ►  2) Chart initial
  public lineChartType: 'line' = 'line';
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Valor',
        tension: 0.3,
        fill: true,
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63,81,181,.25)',
      },
    ],
  };
  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    animation: false,
    scales: {
      x: { title: { display: true, text: 'Hora' } },
      y: { title: { display: true, text: 'Valor' } },
    },
  };

  constructor() {
    console.log('DashboardComponent initialized');
  }

  /* ———————————————————————————————————————————————— */
  // ►  3) Gestion subscription
  private sub?: Subscription;

  ngOnInit(): void {
    console.log('DashboardComponent ngOnInit called');
    this.fetchSensorTypes();
    this.subReadings(this.selectedTypeId!);
  }

  fetchSensorTypes(): void {
    console.log('Fetching sensor types...');

    this.sensorService.getSensorsTypes().subscribe({
      next: (types) => {
        this.typesList = types;
        console.log('Sensor Types:', this.typesList);
      },
      error: (err) => {
        console.error('Error fetching sensor types:', err);
      },
    });
  }

  subReadings(sensorTypeId: number): void {
    console.log('Subscribing to readings for sensor type ID:', sensorTypeId);

    this.sub?.unsubscribe();

    this.sub = this.readingService
      .streamReadings(sensorTypeId)
      .subscribe((readings) => {
        console.log('Received readings:', readings);
        const ordered = readings.reverse();

        this.lineChartData.labels = ordered.map(
          (r: { timestamp: string | number | Date }) =>
            new Date(r.timestamp).toLocaleTimeString()
        );

        this.lineChartData.datasets[0].data = ordered.map(
          (r: { value: any }) => {
            console.log('Reading value:', r.value);
            return r.value;
          }
        );

        this.cdr.detectChanges();
        this.chart?.update();
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
