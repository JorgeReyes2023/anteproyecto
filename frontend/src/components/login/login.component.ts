import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MyTestService } from '../../services/my-test.service'; // Import your service if needed
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

  constructor(private router: Router, private testService: MyTestService) {}

  login() {
    this.testService.getData('').subscribe({
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
