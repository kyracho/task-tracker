import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AuthGuard } from './auth.guard';  // Import the Auth Guard

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Redirect to login by default
  { path: 'login', component: LoginComponent },  // Public access
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },  // Protected route
  { path: 'add-task', component: AddTaskComponent, canActivate: [AuthGuard] },  // Protected route
  { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [AuthGuard] },  // Protected route
];
