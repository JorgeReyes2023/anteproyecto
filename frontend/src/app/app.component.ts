import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyTestService } from '../services/my-test.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private mytest: MyTestService) {}
  title = 'frontend';
}
