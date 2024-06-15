import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-default-autenticate-layout',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon, MatRippleModule, TranslateModule],
  templateUrl: './default-autenticate-layout.component.html',
  styleUrl: './default-autenticate-layout.component.scss'
})
export class DefaultAutenticateLayoutComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() primaryBtnText: string = '';
  @Input() secondaryBtnText: string = '';
  @Input() disablePrimaryBtn: boolean = true;
  @Output('submit') onSubmit = new EventEmitter();

  @Output('navigate') onNavigate = new EventEmitter();

  submit() {
    this.onSubmit.emit();
  }

  navigate() {
    this.onNavigate.emit();
  }
}
