import {Component, OnInit} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {AsyncPipe} from "@angular/common";
import {Auth0ManagementService} from "../../services/Auth0ManagementService";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login-button',
  template: `
    <button
      (click)="login()"
      class="btn-session"
      mat-button
      aria-label="Profile"
    >
      <div class="flex-center">
        <fa-icon class="session-icon" [icon]="faUser"></fa-icon>
        <p>{{ "INICIAR.SESSAO" | translate }}</p>
      </div>
    </button>
  `,
  styles: `.btn-session {
    border: none;
    background: none;
    cursor: pointer;
    height: 45px !important;
    div {
      gap: 10px;

      fa-icon {
        font-size: 20px;
        color: var(--mdc-icon-button-icon-color)
      }
      p {
        margin: 0;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }`,
  imports: [
    AsyncPipe,
    FaIconComponent,
    TranslateModule
  ],
  standalone: true
})
export class LoginButtonComponent{
  constructor(
    public auth: AuthService,
    private authManagement: Auth0ManagementService
  ) {}

  login() {
    this.auth.loginWithRedirect();
  }

  protected readonly faUser = faUser;
}
