import { Component, HostListener, Inject, OnInit, Renderer2 } from '@angular/core';
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
  listBtnPublic = [
    { name: 'Item1', route: '' },
    { name: 'Item2', route: '' },
    { name: 'Item3', route: '' },
  ];
  listBtnLoggedIn = [
    { name: 'Inicio', route: '/start' },
    { name: 'Lista Produtos', route: '/product' },
  ];

  showMenu = false;
  faUser = faUser;
  faMoon = faMoon;
  faSun = faSun;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private authService: AuthService,
    protected router: Router,
    protected themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.renderer.setAttribute(this.document.body, 'class', this.themeService.themeSignal());
    this.loadSession();
  }

  loadSession() {
    this.nomeUsuario = sessionStorage.getItem('nome');
    if (this.nomeUsuario) {
      this.listBtn = this.listBtnLoggedIn;
    } else {
      this.listBtn = this.listBtnPublic;
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
    this.nomeUsuario = null;
    this.loadSession();
    this.router.navigateByUrl('/');
  }

  toggleTheme() {
    this.themeService.updateTheme();
    this.renderer.setAttribute(this.document.body, 'class', this.themeService.themeSignal());
  }
}
