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
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatChipGrid } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
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

import { AddSensorTypeDialogComponent } from '../add-sensor-type-dialog/add-sensor-type-dialog.component';

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
    MatDividerModule,
  ],
  templateUrl: './add-sensors-dialog.component.html',
  styleUrl: './add-sensors-dialog.component.css',
})
export class AddSensorsDialogComponent implements OnInit {
  node: Node;

  sensors = signal<Sensor[]>([]);
  selectedSensors = signal<Sensor[]>([]);
  newSensorsDraft = signal<SensorCreate[]>([]);
  sensorTypesMap = new Map<number, Type>();

  sensorTypes: Type[] = [];

  separatorKeys = [ENTER, COMMA];

  newSensorForm = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    typeIds: [[] as number[], Validators.required], // valeur initiale vide
  });

  showNewSensorForm = signal(false);

  private sensorService = inject(SensorService);

  constructor(
    private dialogRef: MatDialogRef<AddSensorsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) node: Node,
    private dialog: MatDialog
  ) {
    this.node = node;
    this.selectedSensors.set(node.sensors);
  }

  ngOnInit(): void {
    this.sensorService.getSensorsWithoutNode().then((s) => this.sensors.set(s));
    this.sensorService.getSensorsTypes().subscribe((types) => {
      this.sensorTypes = types;
      types.forEach((t) => this.sensorTypesMap.set(t.id, t));
      // Set default type if not already set
      if (!this.newSensorForm.get('typeIds')?.value?.length) {
        this.newSensorForm.patchValue({
          typeIds: types[0]?.id ? [types[0].id] : [],
        });
      }
    });
  }

  filteredSensors = computed(() =>
    this.sensors().filter(
      (s) => !this.selectedSensors().some((sel) => sel.id === s.id)
    )
  );

  compareFn = (a: number, b: number) => a === b;

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
    this.newSensorForm.setValue({
      name: '',
      typeIds: [],
    });
    this.showNewSensorForm.set(false);
  }

  addNewSensorDraft() {
    if (this.newSensorForm.invalid) return;

    const dto: SensorCreate = {
      name: this.newSensorForm.value.name!,
      status: Status.INACTIVE,
      nodeId: undefined,
      typeIds: this.newSensorForm.value.typeIds!, // array
    };

    this.newSensorsDraft.set([...this.newSensorsDraft(), dto]);
    this.newSensorForm.reset({ typeIds: [] });
    this.showNewSensorForm.set(false);
  }

  async confirm() {
    const createdObservables = this.newSensorsDraft().map((d) =>
      this.sensorService.createSensor(d)
    );
    const created = await Promise.all(
      createdObservables.map((obs) => obs.toPromise())
    );

    const allSensors = [...this.selectedSensors(), ...created];
    this.sensorService
      .attachSensorsToNode(this.node.id, this.newSensorsDraft())
      .subscribe(() => {
        this.dialogRef.close(true);
      });
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
        status: Status.INACTIVE,
      };
      this.newSensorsDraft.set([...this.newSensorsDraft(), sensor]);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  onSensorTypeChange(selectedTypeIds: number[]): void {
    if (selectedTypeIds.includes(-1)) {
      const currentTypes =
        this.newSensorForm.value.typeIds?.filter((id) => id !== -1) ?? [];

      this.dialog
        .open(AddSensorTypeDialogComponent, {
          width: '400px',
          data: {},
        })
        .afterClosed()
        .subscribe((newType: Type | null) => {
          if (newType) {
            this.sensorTypes.push(newType);
            this.sensorTypesMap.set(newType.id, newType);

            this.newSensorForm.patchValue({
              typeIds: [...currentTypes, newType.id],
            });
          } else {
            this.newSensorForm.patchValue({ typeIds: currentTypes });
          }
        });
    }
  }
}
