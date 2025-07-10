import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  getAlerts() {
    // Simulate an API call
    return of([
      { id: 1, message: 'New message received', read: false, critical: false },
      { id: 2, message: 'Server error occurred', read: false, critical: true },
      { id: 3, message: 'User signed in', read: true, critical: false },
    ]);
  }
}
