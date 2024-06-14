import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { CityService } from '../../services/city.service';
import { CitySearchDTO } from '../../helper/city-search-dto';
import { ToastrService } from 'ngx-toastr';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LoaderService } from '../../../core/loader.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatInputModule,
    MatIcon,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    JsonPipe,
    AsyncPipe
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
})
export class SearchComponent implements OnInit {
  @Output('submit') onSubmit = new EventEmitter<{ from: number, to: number }>();
  @ViewChild('inputFrom') inputFrom!: ElementRef;
  @ViewChild('inputTo') inputTo!: ElementRef;
  locationListFrom: CitySearchDTO[] = [];
  locationListTo: CitySearchDTO[] = [];

  searchGroup = new FormGroup({
    from: new FormControl<CitySearchDTO | null>(null),
    to: new FormControl<CitySearchDTO | null>(null),
  });

  constructor(
    private cityService: CityService,
    private toastService: ToastrService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {}

  getLocationList(location: string, listType: string) {
    if (location && location.trim().length > 0) {
      this.loaderService.setDisable(true)
      this.cityService.getLocationList(location).subscribe({
        next: (resultado: CitySearchDTO[]) => {
          if (listType === 'from') {
            this.locationListFrom = resultado;
          } else if (listType === 'to') {
            this.locationListTo = resultado;
          }
        },
        error: (err: any) => {
          this.loaderService.setDisable(false)
          console.log('Erro', err);
          this.toastService.error(
            'Erro inesperado! Tente novamente mais tarde'
          );
        }
      });
    }
  }

  displayFn(location: CitySearchDTO): string {
    return location && location.valor ? location.valor : '';
  }

  filter(event: Event, listType: string): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.getLocationList(value, listType);
  }

  trackById(index: number, item: CitySearchDTO): number {
    return item.id_Cidade;
  }

  submit() {
    let from = this.searchGroup.get('from')?.value?.id_Cidade || 0;
    let to = this.searchGroup.get('to')?.value?.id_Cidade || 0;
    
    const inputFrom = this.inputFrom.nativeElement.value.trim()
    const inputTo = this.inputTo.nativeElement.value.trim()

    if (!inputFrom)
      from = 0
    if (!inputTo)
      to = 0
    
    this.onSubmit.emit({ from, to });
  }
}
