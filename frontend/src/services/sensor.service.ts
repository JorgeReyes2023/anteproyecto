import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { Sensor, SensorCreate, SensorType } from '../models/sensor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  constructor(private gService: GeneralService) {}

  getSensorsWithoutNode(): Promise<Sensor[]> {
    // This method should return a promise that resolves to an array of sensors
    // For now, we return an empty array as a placeholder
    return Promise.resolve([]);
  }

  getSensorsTypes(): Observable<SensorType[]> {
    return this.gService.getData('sensors/types');
  }

  createSensor(sensor: SensorCreate): Observable<Sensor> {
    return this.gService.postData('sensors', sensor);
  }

  attachSensorsToNode(
    nodeId: number,
    sensors: SensorCreate[]
  ): Observable<Sensor[]> {
    return this.gService.postData(`nodes/${nodeId}/sensors`, sensors);
  }
}
