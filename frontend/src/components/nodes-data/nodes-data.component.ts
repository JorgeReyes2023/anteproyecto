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
import { CreateNodeDialogComponent } from '../dialogs/create-node-dialog/create-node-dialog.component';
import { UpdateNodeDialogComponent } from '../dialogs/update-node-dialog/update-node-dialog.component';

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
    const dialogRef = this.dialog.open(CreateNodeDialogComponent, {
      data: null, // Pass any initial data if needed
    });

    dialogRef.afterClosed().subscribe((result: Node | undefined) => {
      if (result) {
        this.nodeService.createNode(result).subscribe({
          next: (newNode) => {
            this.fetchNodes(); // Refresh the list after creation
            this.alertService.success(
              `Nodo ${newNode.name} creado correctamente`
            );
          },
          error: (error) => {
            this.alertService.error(
              'Error al crear el nodo. Por favor, inténtelo de nuevo.'
            );
            console.error('Error creating node:', error);
          },
        });
      }
    });
  }

  openUpdateDialog(node: Node) {
    console;
    const dialogRef = this.dialog.open(UpdateNodeDialogComponent, {
      data: node, // Pass the selected node for editing
    });

    dialogRef.afterClosed().subscribe((result: Node | undefined) => {
      if (result) {
        this.nodeService.updateNode(result.id, result).subscribe({
          next: (updatedNode) => {
            this.fetchNodes(); // Refresh the list after update
            this.alertService.success(
              `Nodo ${updatedNode.name} actualizado correctamente`
            );
          },
          error: (error) => {
            this.alertService.error(
              'Error al actualizar el nodo. Por favor, inténtelo de nuevo.'
            );
            console.error('Error updating node:', error);
          },
        });
      }
    });
  }

  onDelete(Node: Node) {
    this.nodeService.deleteNode(Node.id).subscribe({
      next: () => {
        this.alertService.success(`Nodo ${Node.name} eliminado correctamente`);
        this.fetchNodes(); // Refresh the list after deletion
      },
      error: (error) => {
        this.alertService.error(
          'Error al eliminar el nodo. Por favor, inténtelo de nuevo.'
        );
        console.error('Error deleting node:', error);
      },
    });
  }

  trackByNodeId(index: number, node: Node): number {
    return node.id; // Assuming each node has a unique 'id' property
  }

  hasSensors(node: Node): boolean {
    return node.sensors && node.sensors.length > 0;
  }

  hasProject(node: Node): boolean {
    return node.project && !!node.project.id;
  }

  hasLocation(node: Node): boolean {
    return !!node.location;
  }

  getStatusColor(status: Status): 'primary' | 'warn' | 'accent' | undefined {
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
