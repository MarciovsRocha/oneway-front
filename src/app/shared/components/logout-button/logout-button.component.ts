import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-logout-button',
  template: `
    <button class="btn-logout" (click)="logout()">
      Log out
    </button>
  `,
  standalone: true,
  styles: `
    .btn-logout {
      border: none;
      background: none;
      padding: 5px;
    }
  `
})
export class LogoutButtonComponent {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    private auth: AuthService
  ) {}

  logout() {
    localStorage.removeItem('management_token');
    localStorage.removeItem('user_role');
    this.auth.logout({
      logoutParams: {
        returnTo: this.document.location.origin
      }
    });
  }
}
