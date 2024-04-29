import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-default-registration-layout',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon, MatRippleModule],
  templateUrl: './default-registration-layout.component.html',
  styleUrl: './default-registration-layout.component.scss'
})
export class DefaultRegistrationLayoutComponent {

}
