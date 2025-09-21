import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNav } from '@components/side-nav/side-nav';

@Component({
	styleUrl: './dashboard.css',
	templateUrl: './dashboard.html',
	imports: [RouterOutlet, SideNav],
})
export default class Dashboard {}
