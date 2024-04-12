import { HeaderComponent } from '../../shared/components/header/header.component';
import { RotativeCardComponent } from '../../shared/components/rotative-card/rotative-card.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [HeaderComponent, RotativeCardComponent],
})
export class HomeComponent {}
