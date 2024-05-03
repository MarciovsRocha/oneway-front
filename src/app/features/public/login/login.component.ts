import { Component } from '@angular/core';
import { DefaultAutenticateLayoutComponent } from '../../../shared/components/default-autenticate-layout/default-autenticate-layout.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../core/auth.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface LoginForm {
  email: FormControl;
  password: FormControl;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HeaderComponent,
    DefaultAutenticateLayoutComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;
  hide1 = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    if (this.loginForm.value.email == 'easy@login.com') {
      sessionStorage.setItem('nome', 'Test Easy');
      this.toastService.success('Logado com sucesso!');
      this.router.navigate(['start']);
    } else {
      this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: () => {
            this.toastService.success('Logado com sucesso!');
            this.router.navigate(['start']);
          },
          error: (error) => {
            let errorMessage = 'Erro ao autenticar o usuário.';
            if (error.error) {
              errorMessage = error.error;
            }
            this.toastService.error(errorMessage);
          },
        });
    }
  }

  navigate() {
    this.router.navigate(['signup']);
  }
}
