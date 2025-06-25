import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../app/_alert/alert.service';

// add dialogs and services
import { Node } from '../../models/node';

@Component({
  standalone: true,
  selector: 'app-nodes-data',
  imports: [
    CommonModule,
    MatListModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './nodes-data.component.html',
  styleUrl: './nodes-data.component.css',
})
export class NodesDataComponent implements OnDestroy {
  nodes: Node[] = [];
  private destroy$ = new Subject<void>();

  constructor(private dialog: MatDialog, private alertService: AlertService) {
    // Initialize or fetch nodes data here if needed
    this.fetchNodes();
  }

  ngOnInit() {
    // add if needed
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchNodes() {
    // update the UI or perform any other actions needed after fetching
  }

  openCreateDialog() {
    // Implement dialog logic to create a new node
  }

  openUpdateDialog(Node: Node) {
    // Implement dialog logic to update the selected node
  }

  onDelete(Node: Node) {
    // Implement delete logic here
    this.alertService.success(`Node ${Node.name} deleted successfully`);
  }

  trackByNodeId(index: number, node: Node): number {
    return node.id; // Assuming each node has a unique 'id' property
  }
}
