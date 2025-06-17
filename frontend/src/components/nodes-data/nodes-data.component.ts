import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { Node } from '../../models/node';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-nodes-data',
  imports: [
    CommonModule,
    MatListModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './nodes-data.component.html',
  styleUrls: ['./nodes-data.component.css'],
})
export class NodesDataComponent {
  nodes: Node[] = [
    {
      id: 1,
      name: 'Node 1',
      location: 'loc1',
      project: { id: 1, name: 'Company A' },
    },
    {
      id: 2,
      name: 'Node 2',
      location: 'loc2',
      project: { id: 2, name: 'Company B' },
    },
    {
      id: 3,
      name: 'Node 3',
      location: 'loc3',
      project: { id: 3, name: 'Company C' },
    },
  ];
  constructor() {}

  trackByNodeId(index: number, node: Node): number {
    return node.id;
  }

  deleteNode(node: Node): void {
    this.nodes = this.nodes.filter((n) => n.id !== node.id);
  }
}
