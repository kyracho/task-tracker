// navigation.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, NgIf, AsyncPipe ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  showAboutPopup = false;
  constructor(public auth: AuthService) {}

  openAboutPopup(): void {
    this.showAboutPopup = true;  // Show the popup when "About" is clicked
  }

  closeAboutPopup(): void {
    this.showAboutPopup = false;  // Hide the popup when clicking anywhere outside
  }
  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}
