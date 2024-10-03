import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { AuthService } from '@auth0/auth0-angular';
import { NavigationComponent } from '../navigation/navigation.component';
import { FormsModule } from '@angular/forms';  // For ngModel
import { CommonModule } from '@angular/common';  // For ngIf and other common directives
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
  standalone: true,
  imports: [NavigationComponent, FormsModule, CommonModule]  // Add CommonModule for ngIf
})
export class TaskDetailComponent implements OnInit {
  task: Task = { id: '', taskName: '', description: '', status: 'Pending' };  // Initialize task
  successMessage: string | null = null;  // Success message to show in the template

  constructor(
    private taskService: TaskService, 
    private route: ActivatedRoute, 
    private router: Router, 
    public auth: AuthService
  ) {}
  
  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');  // Get task ID from URL
    console.log('Task ID from URL:', taskId);  // Log taskId
    
    if (taskId) {
      // Fetch the username from the authentication service
      this.auth.user$.subscribe(user => {
        const username = user?.nickname;  // Get the nickname from the user object
        console.log('Username from Auth0:', username);  // Log username
  
        if (username) {
          this.taskService.getTask(taskId, username).subscribe(
            (task) => {
              console.log('Task fetched from API:', task);  // Log the fetched task
              if (task) {
                this.task = task;  // Update task once retrieved
              }
            },
            (error) => {
              console.error('Error fetching task:', error);
            }
          );
        } else {
          console.error('Username is null or undefined');
        }
      });
    }
  }
  
  
  saveTask(taskForm: NgForm): void {
    taskForm.form.markAllAsTouched();  // Mark form as submitted
  
    if (taskForm.valid) {
      if (this.task) {
        this.auth.user$.subscribe((user) => {
          const username = user?.nickname || 'defaultUsername';
          this.taskService.updateTask(this.task, username).subscribe(() => {
            this.successMessage = 'Task updated successfully!';  // Set success message
  
            setTimeout(() => {
              this.successMessage = null;  // Clear success message
            }, 2000);  // 2000ms = 2 seconds
          },
          (error) => {
            console.error('Error updating task:', error);  // Log the error
          });
        });
      } else {
        console.error('Task is undefined, cannot update.');
      }
    } else {
      console.log("Form is invalid");  // Log if form is invalid
    }
  }
  
  deleteTask(): void {
    if (this.task && this.task.id) {
      this.auth.user$.subscribe((user) => {
        const username = user?.nickname || 'defaultUsername';
        this.taskService.deleteTask(this.task.id!, username).subscribe(() => {
          this.task = { id: '', taskName: '', description: '', status: 'Pending' };  // Reset task fields
          this.router.navigate(['/tasks']);  // Navigate to task list
        },
        (error) => {
          console.error('Error deleting task:', error);  // Log any error
        });
      });
    } else {
      console.error('Task or Task ID is undefined, cannot delete.');
    }
  }
}
