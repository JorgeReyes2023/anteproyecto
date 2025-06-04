import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';  
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';


@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    this.authService.postData('login',{email:this.email, password:this.password}).subscribe({
      next: (res: any) => {
        console.log('Response from API:', res);
      },
      error: (err: any) => {
        console.error('Error fetching data:', err);
      }
    });

    console.log('Email:', this.email, 'Password:', this.password);
   
    this.router.navigate(['/dashboard']);
  }
}
