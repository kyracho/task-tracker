import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://tasktracker-backend-abgvhjd7dddkg3h6.canadacentral-01.azurewebsites.net/api/tasks';  // Your backend URL

  constructor(private http: HttpClient) { }

  // Get all tasks for a specific user
  getTasks(username: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?username=${username}`);  // Ensure username is passed correctly
  }

  // Get a single task by ID
  getTask(taskId: string, username: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${taskId}?username=${username}`);  // Fetch task by ID
  }

  // Create a new task
  createTask(task: Task, username: string): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}?username=${username}`, task);  // Pass username as a query parameter
  }

  // Update task API call
  updateTask(task: Task, username: string): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}?username=${username}`, task);  // Update task by ID
  }

  // Delete a task
  deleteTask(id: string, username: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}?username=${username}`);  // Delete task by ID
  }
}
