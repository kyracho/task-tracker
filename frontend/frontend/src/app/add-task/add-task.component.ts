import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { NgIf } from '@angular/common';  // Import NgIf
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { NavigationComponent } from '../navigation/navigation.component';  // Import the standalone component
import { AuthService } from '@auth0/auth0-angular';  // Import AuthService

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  standalone: true,
  imports: [NgIf, FormsModule, NavigationComponent]  // Add both NgIf and FormsModule to the imports array
})
export class AddTaskComponent {
  task: Task = {taskName: '', description: '', status: 'Pending' };  // Change id to an empty string
  minLengthError: boolean = false;  // Flag for the minimum length error
  successMessage: string | null = null;  // Success message to show in the template

  // Inject both TaskService and AuthService into the constructor
  constructor(private taskService: TaskService, public auth: AuthService) {}

  addTask(taskForm: any): void {
    // Clear previous messages
    this.successMessage = null;
  
    // Don't proceed if the form is invalid
    if (taskForm.invalid) {
      return;
    }
  
    // Fetch the username from the authentication service
    this.auth.user$.subscribe((user) => {
      const username = user?.nickname || 'defaultUsername';
  
      // Capitalize the status
      this.task.status = this.task.status.charAt(0).toUpperCase() + this.task.status.slice(1).toLowerCase();
  
      // Call the service to create a task
      this.taskService.createTask(this.task, username).subscribe(() => {
        this.successMessage = 'Task added successfully!';
  
        // Reset the task object to clear the input fields
        this.task = { id: '', taskName: '', description: '', status: 'Pending' };
  
        // Clear the successMessage after 2 seconds
        setTimeout(() => {
          this.successMessage = null;
        }, 2000);
      });
    });
  }
  
}
