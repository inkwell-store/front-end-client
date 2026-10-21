import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavBar } from './components/main-nav-bar/main-nav-bar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainNavBar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('inkwell-front-end');
}
