import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {
  nomeUsuario = sessionStorage.getItem('nome');
}
