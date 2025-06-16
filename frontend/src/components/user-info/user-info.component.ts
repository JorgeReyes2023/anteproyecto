import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent {
  user: any;

  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }

  changePassword() {
    // Implement password change logic here
  }
}
