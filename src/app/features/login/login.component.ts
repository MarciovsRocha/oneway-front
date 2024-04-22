import { Component } from '@angular/core';
import { DefaultAutenticateLayoutComponent } from '../../shared/components/default-autenticate-layout/default-autenticate-layout.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthenticateService } from '../../services/authenticate.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { matchValidator } from '../../validators/form-validators';

interface LoginForm {
  email: FormControl;
  password: FormControl;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.password === control.value.passwordConfirm
    ? null
    : { PasswordNoMatch: true };
};

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
  matcher = new MyErrorStateMatcher();
  hide1 = true;

  constructor(
    private router: Router,
    private authenticateService: AuthenticateService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  submit() {

    this.authenticateService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: () => this.toastService.success('Logado com sucesso!'),
        error: () =>
          this.toastService.error(
            'Erro inesperado! Tente novamente mais tarde'
          ),
      });
  }

  navigate() {
    this.router.navigate(['signup']);
  }
}
