import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../dialogs/update-user/update-user.component';

import { User } from '../../models/user';

@Component({
  standalone: true,
  selector: 'app-users-data',
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.css'],
})
export class UsersDataComponent {
  users: User[] = [
    { id: 1, name: 'john_doe', email: 'john@example.com', role: 'admin' },
    {
      id: 2,
      name: 'jane_doe',
      email: 'jane@example.com',
      role: 'user',
      company: 'Tech Corp',
    },
  ];

  constructor(private dialog: MatDialog) {}

  openUpdateDialog(user: User) {
    if (!user) {
      console.error('No user data provided for update dialog');
      return;
    }
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('User updated:', result);
        this.onUpdate(result);
      }
    });
  }

  onUpdate(user: User) {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...user };
      console.log('Update user:', user);
    }
  }

  onDelete(user: User) {
    this.users = this.users.filter((u) => u.id !== user.id);
    console.log('Delete user:', user);
  }
}
