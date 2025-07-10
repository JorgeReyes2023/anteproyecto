import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Alert {
  sensorId: number;
  message: string;
  level: 'warning' | 'critical';
  timestamp: Date;
  read?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertsSubject = new BehaviorSubject<Alert[]>([]);
  public alerts$ = this.alertsSubject.asObservable();

  constructor() {
    if (typeof window !== 'undefined') {
      const eventSource = new EventSource('http://localhost:3000/sse/alerts');

      eventSource.onmessage = (event) => {
        const alert: Alert = JSON.parse(event.data);
        alert.read = false;
        alert.timestamp = new Date(alert.timestamp);

        const current = this.alertsSubject.value;
        this.alertsSubject.next([alert, ...current]);
      };

      eventSource.onerror = (error) => {
        console.error('Erreur SSE', error);
      };
    }
  }

  markAllAsRead() {
    const updated = this.alertsSubject.value.map((a) => ({ ...a, read: true }));
    this.alertsSubject.next(updated);
  }
}
