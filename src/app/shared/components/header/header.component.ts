import {
  Component,
  HostListener,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';
import { UserType } from '../../enum/user-type.enum';
import { TranslateLanguageService } from '../../../core/translate-language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
    MatMenuModule,
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  nomeUsuario: string | null = null;
  innerWidth: number = window.innerWidth;
  isAuthenticated = false;
  isNightMode = false;
  listBtn: any = [];

  showMenu = false;
  faUser = faUser;
  faMoon = faMoon;
  faSun = faSun;

  private subscription: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private authService: AuthService,
    protected router: Router,
    protected themeService: ThemeService,
    protected translateLanguageService: TranslateLanguageService
  ) {}

  ngOnInit(): void {
    this.translateLanguageService.start()
    this.renderer.setAttribute(
      this.document.body,
      'class',
      this.themeService.themeSignal()
    );
    this.subscription = this.authService.nomeUsuario$.subscribe((nome) => {
      this.nomeUsuario = nome;
      this.updateMenu();
    });
  }

  loadSession() {
    this.nomeUsuario = sessionStorage.getItem('nome');
    this.updateMenu()
  }

  updateMenu() {
    this.getMenu()
  }

  getMenu() {
    this.listBtn = [{ name: 'Inicio', route: '/home' }];
    let typeUser = this.authService.getUserType();
    switch (typeUser) {
      case UserType.Cliente:
        this.listBtn.push(
          { name: 'Montar Pacote', route: '/package' },
          { name: 'Minhas Viagens', route: '/travels' },
        );
        break;
      case UserType.Proprietario:
        this.listBtn.push(
          { name: 'Lista Produtos', route: '/product' },
          { name: 'Lista Localidades', route: '/location' },
        );
        break;
      case UserType.Administrador:
        this.listBtn.push(
          { name: 'Dashboard', route: '/home-adm' },
          { name: 'Lista Produtos', route: '/product' },
          { name: 'Lista Localidades', route: '/location' },
        );
        break;
      default:
        this.listBtn.push({ name: 'Montar Pacote', route: '/package' });
        break;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  get isMobile() {
    return this.innerWidth <= 576;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  toggleTheme() {
    this.themeService.updateTheme();
    this.renderer.setAttribute(
      this.document.body,
      'class',
      this.themeService.themeSignal()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
