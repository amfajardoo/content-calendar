import { DOCUMENT } from '@angular/common';
import { effect, Injectable, inject, signal } from '@angular/core';

export type ThemeOptions = 'light' | 'dark';

@Injectable({
	providedIn: 'root',
})
export class Theme {
	private readonly document = inject(DOCUMENT);
	private readonly theme = signal<ThemeOptions>('light');

	constructor() {
		effect(() => {
			this.document.body.classList.remove('light', 'dark');
			this.document.body.classList.add(this.theme());
		});
	}

	toggleTheme() {
		this.theme.update((current) => (current === 'light' ? 'dark' : 'light'));
	}
}
