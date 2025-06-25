import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { Node } from '../../../models/node';

@Component({
  selector: 'app-update-node-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './update-node-dialog.component.html',
  styleUrl: './update-node-dialog.component.css',
})
export class UpdateNodeDialogComponent {
  localNode: Node;

  constructor(
    public dialogRef: MatDialogRef<UpdateNodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public node: Node
  ) {
    // shallow copy – use structuredClone for deep copy if nested objects exist
    this.localNode = { ...node };
    console.log('UpdateNodeDialogComponent initialized with node:', node);
    console.log('localNode:', this.localNode);
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.localNode);
    }
  }
}
