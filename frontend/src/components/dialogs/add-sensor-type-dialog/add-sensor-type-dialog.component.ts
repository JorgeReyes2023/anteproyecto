import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  NgForm,
} from '@angular/forms';

@Component({
  selector: 'app-add-sensor-type-dialog',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-sensor-type-dialog.component.html',
  styleUrl: './add-sensor-type-dialog.component.css',
})
export class AddSensorTypeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddSensorTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close({
        name: form.value.name,
        unit: form.value.unit,
        description: form.value.description,
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
