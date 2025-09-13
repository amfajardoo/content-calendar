import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppStore } from '@core/data-access/app.store';

@Component({
	selector: 'app-signin',
	imports: [ReactiveFormsModule],
	templateUrl: './signin.html',
	styleUrl: './signin.css',
})
export default class Signin {
	readonly #store = inject(AppStore);
	#fb = inject(FormBuilder);
	form = this.#fb.nonNullable.group({
		email: this.#fb.nonNullable.control('', {
			validators: [Validators.required, Validators.email],
		}),
		password: this.#fb.nonNullable.control('', {
			validators: [Validators.required],
		}),
	});

	login() {
		this.#store.login(this.form.getRawValue());
	}
}
