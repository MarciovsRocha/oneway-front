import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-default-list-layout',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon, MatRippleModule],
  templateUrl: './default-list-layout.component.html',
  styleUrl: './default-list-layout.component.scss'
})
export class DefaultListLayoutComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() primaryBtnText: string = '';

  @Output('submit') onSubmit = new EventEmitter();

  submit() {
    this.onSubmit.emit();
  }
}
