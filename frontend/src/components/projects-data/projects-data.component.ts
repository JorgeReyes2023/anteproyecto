import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
// add dialogs

import { AlertService } from '../../app/_alert/alert.service';

@Component({
  selector: 'app-projects-data',
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './projects-data.component.html',
  styleUrls: ['./projects-data.component.css'],
})
export class ProjectsDataComponent {
  projects: Project[] = [];

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService,
    private alertService: AlertService
  ) {}
  ngOnInit() {
    this.fetchProjects();
  }

  fetchProjects() {
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        console.log('Fetched projects:', projects);
        this.projects = projects;
        console.log(
          'Fetched projects companies:',
          this.projects[0]?.companies?.name
        );
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
        this.alertService.error('Failed to fetch projects');
      },
    });
  }

  openUpdateDialog(project: Project) {
    /*if (!project) {
      console.error('No project data provided for update dialog');
      return;
    }
    const dialogRef = this.dialog.open(UpdateProjectComponent, {
      data: { ...project },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onUpdate(result);
      }
    });*/
  }

  onUpdate(project: Project) {
    if (!project) {
      console.error('No project data provided for update');
      return;
    }
    this.projectService.updateProject(project.id, project).subscribe({
      next: () => {
        this.alertService.success('Project updated successfully');
        this.fetchProjects();
      },
      error: (err) => {
        console.error('Error updating project:', err);
        this.alertService.error('Failed to update project');
      },
    });
  }

  onDelete(project: Project) {
    if (!project) {
      console.error('No project data provided for deletion');
      return;
    }
    this.projectService.deleteProject(project.id).subscribe({
      next: () => {
        this.alertService.success('Project deleted successfully');
        this.fetchProjects();
      },
      error: (err) => {
        console.error('Error deleting project:', err);
        this.alertService.error('Failed to delete project');
      },
    });
  }

  trackByProjectId(index: number, project: Project): number {
    return project.id;
  }
}
