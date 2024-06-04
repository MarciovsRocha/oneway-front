import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themeSignal = signal<string>(
    JSON.parse(window.localStorage.getItem('theme') ?? JSON.stringify('light'))
  );

  setTheme(theme: string) {
    this.themeSignal.set(theme);
  }

  updateTheme() {
    this.themeSignal.update((value) => (value === 'dark' ? 'light' : 'dark'));
  }

  constructor() {
	effect(()=>{
		window.localStorage.setItem('theme', JSON.stringify(this.themeSignal()))
	})
  }
}
