import { Component } from '@angular/core';
import { DefaultRegistrationLayoutComponent } from '../../../shared/components/default-registration-layout/default-registration-layout.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-hotel-registration',
  standalone: true,
  imports: [
    HeaderComponent,
    DefaultRegistrationLayoutComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './hotel-registration.component.html',
  styleUrl: './hotel-registration.component.scss',
})
export class HotelRegistrationComponent {
  hotelForm!: FormGroup<any>;
}
