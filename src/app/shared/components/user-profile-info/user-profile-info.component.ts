import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-user-profile',
  template: `
    <ul *ngIf="auth.user$ | async as user">
      <li>{{ user.name }}</li>
      <li>{{ user.email }}</li>
    </ul>`,
  imports: [
    AsyncPipe
  ],
  standalone: true
})
export class UserProfileComponent {
  constructor(public auth: AuthService) {}
}
