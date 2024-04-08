import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
    MatMenuModule,
    MatListModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  showMenu = false;
  faUser = faUser;
  faMoon = faMoon;
  faSun = faSun;
}
