import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../../../core/loader.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LoadingComponent {
  constructor(public loader: LoaderService) { }
}
