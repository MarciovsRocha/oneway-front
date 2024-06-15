import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [HeaderComponent, TranslateModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {
  nomeUsuario = sessionStorage.getItem('nome');
}
