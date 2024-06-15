import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-default-registration-layout',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon, MatRippleModule, FontAwesomeModule, TranslateModule],
  templateUrl: './default-registration-layout.component.html',
  styleUrl: './default-registration-layout.component.scss'
})
export class DefaultRegistrationLayoutComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() primaryBtnText: string = '';
  @Input() disablePrimaryBtn: boolean = true;

  @Output('submit') onSubmit = new EventEmitter();
  @Output('back') onBack = new EventEmitter();

  faAngleLeft = faAngleLeft

  submit() {
    this.onSubmit.emit();
  }

  back() {
    this.onBack.emit();
  }
}
