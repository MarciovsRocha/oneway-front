import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { Produto } from '../../../shared/models/produto';
import { Hotel } from '../../../shared/models/Hotel';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon, MatChipsModule, MatRippleModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() produto: Hotel = new Hotel();
  @Input() filtroImagem: string = ""
  @Output() notify: EventEmitter<Hotel> = new EventEmitter<Hotel>();
  image = 'https://bartenderstore.com.br/wp-content/uploads/2023/05/no-image.jpg'

  ngOnInit() {
    this.image = 'https://picsum.photos/seed/'+ this.filtroImagem + this.produto.id + '/300/300'
  }

  onButtonClick(object: Hotel): void {
    object.image = this.image
    this.notify.emit(object);
  }
}
