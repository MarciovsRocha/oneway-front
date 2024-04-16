import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-travel-cart',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    FontAwesomeModule,
    MatBottomSheetModule,
    MatBadgeModule,
    MatCardModule
  ],
  templateUrl: './travel-cart.component.html',
  styleUrl: './travel-cart.component.scss',
})
export class TravelCartComponent {
  faBoxOpen = faBoxOpen;
  constructor(private _bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this._bottomSheet.open(InsideTravelCart);
  }
}

@Component({
  selector: 'inside-travel-cart',
  templateUrl: './inside-travel-cart/inside-travel-cart.html',
  styleUrl: './travel-cart.component.scss',
  standalone: true,
  imports: [MatListModule, MatCardModule, MatIconModule, MatRippleModule],
})
export class InsideTravelCart {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<TravelCartComponent>
  ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
