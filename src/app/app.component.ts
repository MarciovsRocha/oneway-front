import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { ThemeService } from './shared/services/theme.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { TravelCartComponent } from './shared/components/travel-cart/travel-cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule ,LoadingComponent, TravelCartComponent, HeaderComponent, FooterComponent, FontAwesomeModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'oneway'
}
