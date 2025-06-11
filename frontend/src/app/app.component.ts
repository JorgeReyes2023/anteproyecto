import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyTestService } from '../services/my-test.service';
import { AlertComponent } from './_alert/alert.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertComponent,MatToolbarModule, MatButtonModule, MatCardModule, MatTabsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private mytest: MyTestService) {}
  title = 'frontend';
}
