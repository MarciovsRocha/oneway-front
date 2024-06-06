import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIcon,
    MatRippleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    FontAwesomeModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  orders: Product[];

  faChevronRight = faChevronRight;
  faAngleLeft = faAngleLeft;
  
  constructor(
    public dialog: MatDialog,
    private router: Router,
  ) {}

  back() {
    this.router.navigate(['']);
  }
}
