import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Sensor } from '../../models/sensor';
import { SensorService } from '../../services/sensor.service';

@Component({
  selector: 'app-sensor-details',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatListModule,
  ],
  templateUrl: './sensor-details.component.html',
  styleUrl: './sensor-details.component.css',
})
export class SensorDetailsComponent {
  sensor: Sensor | null = null;

  constructor(
    private sensorService: SensorService,
    private route: ActivatedRoute
  ) {
    const sensorId = this.route.snapshot.params['id'];
    this.sensorService.getSensorById(sensorId).subscribe((data) => {
      this.sensor = data;
    });
  }
}
