import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';  // Assume Task model is defined
import { CommonModule } from '@angular/common';  // Import CommonModule
import { NavigationComponent } from '../navigation/navigation.component';  // Import NavigationComponent
import { AuthService } from '@auth0/auth0-angular';  // Auth0 AuthService
import { RouterModule } from '@angular/router';  // Import RouterModule

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule, NavigationComponent, RouterModule],
  standalone: true
})

export class TaskListComponent implements OnInit {
  tasks: Task[] = [];  // Empty array, tasks will be fetched from the backend
  isLoading: boolean = true;  // To track loading state
  sortBy: string = '';  // To track the current sorting criteria
  sortOrder: string = 'asc';  // 'asc' for ascending, 'desc' for descending
  username: string = '';  // To store the username

  // Inject AuthService to access the user's information
  constructor(private taskService: TaskService, private authService: AuthService) {}

  ngOnInit(): void {
    // Fetch tasks for the logged-in user using the username
    this.authService.user$.subscribe(user => {
      if (user && user['nickname']) {
        const username = user['nickname'];  // Use nickname or adjust if needed
        this.loadTasks(username);
      } else {
        this.isLoading = false;  // If no user is found, stop loading
      }
    });
  }

  // Method to fetch tasks from backend
  loadTasks(username: string): void {
    this.isLoading = true;  // Set loading to true before fetching tasks
    this.taskService.getTasks(username).subscribe(
      (tasks) => {
        this.tasks = tasks || [];  // Assign an empty array if no tasks are returned
        this.isLoading = false;  // Stop loading when tasks are fetched
      },
      (error) => {
        console.error('Error fetching tasks:', error);
        this.isLoading = false;  // Stop loading even if there is an error
      }
    );
  }

  // Sort tasks based on the property and toggle between ascending/descending
  // Sort tasks based on the property and toggle between ascending/descending
sortTasks(property: string): void {
  // Toggle sort order if the same property is clicked; otherwise, default to 'asc'
  if (this.sortBy === property) {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortOrder = 'asc';  // Reset to ascending for new property
  }

  this.tasks.sort((a, b) => {
    let comparison = 0;

    // Sort by taskName or status
    if (property === 'taskName') {
      comparison = a.taskName.localeCompare(b.taskName);  // Sorting by taskName
    } else if (property === 'status') {
      comparison = a.status.localeCompare(b.status);  // Sorting by status
    }

    return this.sortOrder === 'asc' ? comparison : -comparison;
  });

    this.sortBy = property;  // Set current sorting property
  }
}
