import {
  ChangeDetectorRef,
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
import { ThemeService } from '../../services/theme.service';
import { LoginButtonComponent } from "../login-button/login-button.component";
import { LogoutButtonComponent } from "../logout-button/logout-button.component";
import { UserProfileComponent } from "../user-profile-info/user-profile-info.component";
import { AuthService } from "@auth0/auth0-angular";
import {Auth0ManagementService} from "../../services/Auth0ManagementService";
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
    TranslateModule,
    LoginButtonComponent,
    LogoutButtonComponent,
    UserProfileComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit{
  userId: string;
  innerWidth: number = window.innerWidth;
  isNightMode = false;
  listBtn: any = [];

  showMenu = false;
  faUser = faUser;
  faMoon = faMoon;
  faSun = faSun;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    protected authService: AuthService,
    protected router: Router,
    protected themeService: ThemeService,
    protected authManagement: Auth0ManagementService,
    private cdr: ChangeDetectorRef,
    protected translateLanguageService: TranslateLanguageService
  ) {
    // store UserID
    if (this.authService.isAuthenticated$){
      this.authService.user$.subscribe((profile)=>{
        if (profile){
          this.userId = profile.sub;
          this.getMenu();
        }
      });
    }
  }

  ngOnInit() {
    this.translateLanguageService.start()
  }

  async getMenu() {
    this.listBtn = [{ name: 'INICIO', route: '/home' }];
    let typeUser = await this.authManagement.getUserRole(this.userId);

    if (typeUser === 'Cliente') {
      this.listBtn.push(
          { name: 'MONTAR.PACOTE', route: '/package' },
          { name: 'MINHAS.VIAGENS', route: '/travels' },
        );
    } else if (typeUser === 'Proprietario') {
      this.listBtn.push(
          { name: 'LISTA.PRODUTOS', route: '/product' },
          { name: 'LISTA.LOCALIDADES', route: '/location' },
        );
    } else if (typeUser === 'Administrador') {
      this.listBtn.push(
          { name: 'DASHBOARD', route: '/home-adm' },
          { name: 'LISTA.PRODUTOS', route: '/product' },
          { name: 'LISTA.LOCALIDADES', route: '/location' },
        );
    } else {
      this.listBtn.push({ name: 'MONTAR.PACOTE', route: '/package' });
    }

    this.cdr.detectChanges();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  get isMobile() {
    return this.innerWidth <= 576;
  }

  toggleTheme() {
    this.themeService.updateTheme();
    this.renderer.setAttribute(
      this.document.body,
      'class',
      this.themeService.themeSignal()
    );
  }
}
