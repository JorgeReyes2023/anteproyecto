import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from '../../services/general.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AlertService } from '../../app/_alert/alert.service';

@Component({
  standalone: true,
  selector: 'app-users',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class createUserComponent {
  username = '';
  email = '';
  password = '';
  role = '';

  roles = [
    { value: 'admin', viewValue: 'Administrador' },
    { value: 'user', viewValue: 'Usuario' },
  ];
  constructor(
    private router: Router,
    private generalService: GeneralService,
    private alertService: AlertService
  ) {}

  createUser() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
    };

    if (
      !userData.username ||
      !userData.email ||
      !userData.password ||
      !userData.role
    ) {
      console.error('All fields are required.');
      this.alertService.error('Se requiere completar todos los campos.');
      return;
    }
    this.generalService.postData('auth/register', userData).subscribe({
      next: (res: any) => {
        this.alertService.success('Usuario creado exitosamente.');
        this.router.navigate(['/users']);
      },
      error: (err: any) => {
        this.alertService.error(
          'Error al crear el usuario. Inténtalo de nuevo.'
        );
      },
    });
  }
}
