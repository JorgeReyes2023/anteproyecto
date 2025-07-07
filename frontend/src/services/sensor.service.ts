import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import {
  Sensor,
  SensorCreate,
  SensorType,
  SensorTypeCreate,
} from '../models/sensor';
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

  getSensors(): Observable<Sensor[]> {
    return this.gService.getData('sensors');
  }

  createSensor(sensor: SensorCreate): Observable<Sensor> {
    return this.gService.postData('sensors', sensor);
  }

  attachSensorsToNode(nodeId: number, sensors: Sensor[]): Observable<Sensor[]> {
    const sensorIds = sensors
      .map((sensor) => sensor.id)
      .filter((id): id is number => typeof id === 'number');
    return this.gService.putData(`sensors/attach/node`, {
      idNode: nodeId,
      sensorIds,
    });
  }

  // -- sensor types
  getSensorsTypes(): Observable<SensorType[]> {
    return this.gService.getData('sensors/types');
  }

  createSensorType(type: SensorTypeCreate): Observable<SensorType> {
    return this.gService.postData('sensors/types', type);
  }
}
