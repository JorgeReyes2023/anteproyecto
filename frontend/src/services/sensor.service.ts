import { Injectable } from '@angular/core';
import { Sensor } from '../models/sensor';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  constructor() {}

  getSensorsWithoutNode(): Promise<Sensor[]> {
    // This method should return a promise that resolves to an array of sensors
    // For now, we return an empty array as a placeholder
    return Promise.resolve([]);
  }
}
