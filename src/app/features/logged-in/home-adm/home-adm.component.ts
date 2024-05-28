import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home-adm',
  standalone: true,
  imports: [
    HeaderComponent,
    MatCardModule,
    MatButtonModule,
    MatIcon,
    MatRippleModule,
  ],
  templateUrl: './home-adm.component.html',
  styleUrl: './home-adm.component.scss',
})
export class HomeAdmComponent {
  headerData = [
    {
      title: 'Total de Usuários',
      value: 1000
    },
    {
      title: 'Total de Compras',
      value: 1000
    },
    {
      title: 'Total de Produtos',
      value: 1000
    }
  ]

}
