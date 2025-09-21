import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Theme } from '@core/theme/theme';
import { AuthStore } from '../auth.store';

@Component({
	selector: 'app-signin',
	imports: [ReactiveFormsModule],
	templateUrl: './signin.html',
	styleUrl: './signin.css',
})
export default class Signin {
	readonly #store = inject(AuthStore);
	readonly #theme = inject(Theme);
	#fb = inject(FormBuilder);
	form = this.#fb.nonNullable.group({
		email: this.#fb.nonNullable.control('', {
			validators: [Validators.required, Validators.email],
		}),
		password: this.#fb.nonNullable.control('', {
			validators: [Validators.required],
		}),
	});

	isLoading = computed(() => this.#store.isLoading());

	login() {
		this.#store.login(this.form.getRawValue());
	}

	toggleTheme() {
		this.#theme.toggleTheme();
	}
}
