// add-sensors-dialog.component.ts
import {
  Component,
  Inject,
  OnInit,
  signal,
  computed,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatChipGrid } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { Sensor, SensorCreate } from '../../../models/sensor';
import { Status } from '../../../models/status';
import { Node } from '../../../models/node';
import { Type } from '../../../models/type';
import { SensorService } from '../../../services/sensor.service';

@Component({
  selector: 'app-add-sensors-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatChipGrid,
  ],
  templateUrl: './add-sensors-dialog.component.html',
  styleUrl: './add-sensors-dialog.component.css',
})
export class AddSensorsDialogComponent implements OnInit {
  node: Node;

  sensors = signal<Sensor[]>([]);
  selectedSensors = signal<Sensor[]>([]);
  newSensorsDraft = signal<SensorCreate[]>([]);

  sensorTypes: Type[] = [];

  separatorKeys = [ENTER, COMMA];

  newSensorForm = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    typeId: [null as number | null, Validators.required],
  });

  showNewSensorForm = signal(false);

  private sensorService = inject(SensorService);

  constructor(
    private dialogRef: MatDialogRef<AddSensorsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) node: Node
  ) {
    this.node = node;
    this.selectedSensors.set(node.sensors);
  }

  ngOnInit(): void {
    this.sensorService.getSensorsWithoutNode().then((s) => this.sensors.set(s));
  }

  filteredSensors = computed(() =>
    this.sensors().filter(
      (s) => !this.selectedSensors().some((sel) => sel.id === s.id)
    )
  );

  selectSensor(sensor: Sensor) {
    if (!this.selectedSensors().some((s) => s.id === sensor.id))
      this.selectedSensors.set([...this.selectedSensors(), sensor]);
  }

  removeSensor(sensor: Sensor) {
    this.selectedSensors.set(
      this.selectedSensors().filter((s) => s.id !== sensor.id)
    );
  }

  toggleNewSensorForm() {
    this.showNewSensorForm.set(!this.showNewSensorForm());
  }

  cancelNewSensor() {
    this.newSensorForm.reset();
    this.showNewSensorForm.set(false);
  }

  addNewSensorDraft() {
    if (this.newSensorForm.invalid) return;
    const draft: SensorCreate = {
      ...this.newSensorForm.getRawValue(),
      nodeId: undefined,
      status: Status.INACTIVE,
    };
    this.newSensorsDraft.set([...this.newSensorsDraft(), draft]);
    this.newSensorForm.reset();
    this.showNewSensorForm.set(false);
  }

  async confirm() {
    const selected = this.selectedSensors();
    const drafts = this.newSensorsDraft();

    const created = selected.map((s) => ({
      id: s.id,
      name: s.name,
      nodeId: this.node.id,
      status: s.status,
      thresholds: s.thresholds,
    })) as SensorCreate[];

    created.push(...drafts);

    this.dialogRef.close(created);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  addSensorFromInput(event: any): void {
    const input = event.input;
    const value = event.value;

    // Add our sensor
    if ((value || '').trim()) {
      const sensor: SensorCreate = {
        name: value.trim(),
        nodeId: this.node.id,
        status: Status.INACTIVE,
      };
      this.newSensorsDraft.set([...this.newSensorsDraft(), sensor]);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
}
