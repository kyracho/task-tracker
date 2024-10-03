import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Check if user is authenticated
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        // If logged in, redirect to the tasks page
        this.router.navigate(['/tasks']);
      }
    });
  }

  login(): void {
    this.auth.loginWithRedirect();  // Trigger login
  }
}
