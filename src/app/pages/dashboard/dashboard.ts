import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNav } from '@components/side-nav/side-nav';

@Component({
	standalone: true,
	styleUrl: './dashboard.css',
	templateUrl: './dashboard.html',
	imports: [RouterOutlet, SideNav],
})
export default class Dashboard {
	isMobileMenuOpen = signal(true);
	isCollapsed = signal(false);

	openMobileMenu() {
		this.isMobileMenuOpen.set(true);
	}

	toggleCollapse() {
		this.isCollapsed.update((v) => !v);
	}

	closeMobileMenu() {
		this.isMobileMenuOpen.set(false);
	}
}
