import { TestBed } from '@angular/core/testing';

import { Theme } from './theme';

describe('Theme', () => {
	let theme: Theme;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		theme = TestBed.inject(Theme);
	});

	it('should be created', () => {
		expect(theme).toBeTruthy();
	});

	it('should toggle theme', () => {
		expect(document.body.classList.contains('light')).toBe(true);
		theme.toggleTheme();
		expect(document.body.classList.contains('dark')).toBe(true);
		theme.toggleTheme();
		expect(document.body.classList.contains('light')).toBe(true);
	});
});
