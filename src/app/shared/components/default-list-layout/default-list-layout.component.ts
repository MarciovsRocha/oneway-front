import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-default-list-layout',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon, MatRippleModule, TranslateModule],
  templateUrl: './default-list-layout.component.html',
  styleUrl: './default-list-layout.component.scss'
})
export class DefaultListLayoutComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() newItemBtnText: string = '';
  @Input() backBtnText: string = '';

  @Output('newItem') onNewItem = new EventEmitter();
  @Output('back') onBack = new EventEmitter();

  back() {
    this.onBack.emit();
  }

  newItem() {
    this.onNewItem.emit();
  }
}
