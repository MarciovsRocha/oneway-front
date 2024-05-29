import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-type-user',
  standalone: true,
  imports: [
    HeaderComponent,
    MatCardModule,
    MatButtonModule,
    MatIcon,
    RouterModule,
  ],
  templateUrl: './type-user.component.html',
  styleUrl: './type-user.component.scss',
})
export class TypeUserComponent {}
