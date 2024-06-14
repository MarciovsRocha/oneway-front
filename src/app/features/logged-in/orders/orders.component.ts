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
import { Order } from '../../../shared/models/order';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

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
    CommonModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  orders: Order[] = [];

  faChevronRight = faChevronRight;
  faAngleLeft = faAngleLeft;

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    this.orders = JSON.parse(localStorage.getItem('orders')) || [];
  }

  back() {
    this.router.navigate(['']);
  }

  edit(element: Order, orderNumber: number) {
    if (element) element.numero = orderNumber;
    this.router.navigate([`travels/detail`], {
      state: {
        data: element,
      },
    });
  }

  get ordersDesc() {
    if (this.orders && this.orders.length > 0) {
      return this.orders.sort((a, b) => {
        const dateA = new Date(a.dataCompra);
        const dateB = new Date(b.dataCompra);
        return dateB.getTime() - dateA.getTime();
      });
    }
    return []
  }
}
