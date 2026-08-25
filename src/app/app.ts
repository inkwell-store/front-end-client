import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavBar } from './components/main-nav-bar/main-nav-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainNavBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('inkwell-front-end');
}
