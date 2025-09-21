import { Component, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
	name: string;
	icon: string;
	route: string;
}

@Component({
	selector: 'app-side-nav',
	standalone: true,
	imports: [RouterLink, RouterLinkActive],
	templateUrl: './side-nav.html',
	styleUrl: './side-nav.css',
})
export class SideNav {
	isCollapsed = input.required<boolean>();

	navItems = signal<NavItem[]>([
		{ name: 'Transactions', icon: 'exchange', route: './transactions' },
		{ name: 'Categories', icon: 'folder', route: './categories' },
		{ name: 'Goals', icon: 'target', route: './goals' },
	]);
}
