import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { UserType } from '../../../shared/enum/user-type.enum';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-type-user',
  standalone: true,
  imports: [
    HeaderComponent,
    MatCardModule,
    MatButtonModule,
    MatIcon,
    RouterModule,
  ],
  templateUrl: './type-user.component.html',
  styleUrl: './type-user.component.scss',
})
export class TypeUserComponent {
  UserType = UserType

  constructor(private router: Router,
    private authService: AuthService
  ) {}

  navigateAndSetType(route: string, type: number) {
    sessionStorage.setItem('type', type.toString());
    this.authService.updateData();
    this.router.navigate([route]);
  }
}
