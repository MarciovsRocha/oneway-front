import { Component } from '@angular/core';
import { LoaderService } from '../../../core/loader.service';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgxSpinnerModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {
  constructor(public loader: LoaderService) { }
}
