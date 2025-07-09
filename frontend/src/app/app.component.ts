import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
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

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
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

  // theme
  darkMode = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: unknown,
    private authService: AuthService,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId as Object);
    this.user$ = this.authService.user$;
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
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
