import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AlertComponent } from './_alert/alert.component';
import { isPlatformBrowser, NgIf, AsyncPipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { AlertService } from '../services/alert.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AlertComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    NgIf,
    AsyncPipe,
    MatDialogModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isBrowser: boolean;
  public user$: Observable<User | null>;

  // alerts
  unreadCount: number = 0;
  hasCritical: boolean = false;

  // theme
  darkMode = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: unknown,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId as Object);
    this.user$ = this.authService.user$;
  }

  ngOnInit() {
    this.loadAlerts();
  }

  loadAlerts() {
    this.alertService.getAlerts().subscribe((alerts) => {
      this.unreadCount = alerts.filter((alert) => !alert.read).length;
      this.hasCritical = alerts.some((alert) => alert.critical);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    const classList = document.body.classList;
    classList.toggle('dark-theme', this.darkMode);
  }

  title = 'frontend';
}
