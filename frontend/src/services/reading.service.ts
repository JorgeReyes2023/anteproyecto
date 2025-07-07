// reading.service.ts
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { interval, startWith, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReadingService {
  private readonly refreshMs = 2_000;

  constructor(private generalService: GeneralService) {}

  getReadingsBySensorTypeId(sensorTypeId: number) {
    return this.generalService.getData(
      `sensors/types/${sensorTypeId}/readings`
    );
  }

  streamReadings(sensorTypeId: number) {
    return interval(this.refreshMs).pipe(
      startWith(0),
      switchMap(() => this.getReadingsBySensorTypeId(sensorTypeId))
    );
  }
}
