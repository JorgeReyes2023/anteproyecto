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
import { NodeService } from '../../services/node.service';
import { Status } from '../../models/status';

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

  constructor(
    private dialog: MatDialog,
    private alertService: AlertService,
    private nodeService: NodeService
  ) {
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
    this.nodeService
      .getNodes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (nodes: Node[]) => {
          this.nodes = nodes;
          console.log('Fetched nodes:', this.nodes);
        },
        error: (error) => {
          this.alertService.error('Failed to fetch nodes');
          console.error('Error fetching nodes:', error);
        },
      });
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

  getStatusColor(status: Status): 'primary' | 'warn' | 'accent' | undefined {
    console.log('getStatusColor called with status:', status);
    switch (status) {
      case Status.ACTIVE:
        return 'primary';
      case Status.INACTIVE:
      case Status.ERROR:
        return 'warn';
      case Status.MAINTENANCE:
        return 'accent';
      default:
        return undefined;
    }
  }

  getStatusIcon(status: Status): string {
    switch (status) {
      case Status.ACTIVE:
        return 'check_circle';
      case Status.INACTIVE:
        return 'cancel';
      case Status.MAINTENANCE:
        return 'hourglass_empty';
      case Status.ERROR:
        return 'error';
      default:
        return 'help';
    }
  }
}
