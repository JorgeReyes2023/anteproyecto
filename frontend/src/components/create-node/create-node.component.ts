import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-create-node',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-node.component.html',
  styleUrls: ['./create-node.component.css'],
})
export class CreateNodeComponent {}
