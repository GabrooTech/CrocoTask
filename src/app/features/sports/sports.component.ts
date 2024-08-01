import { Component } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav.component';

@Component({
  selector: 'app-sports',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './sports.component.html',
  styleUrl: './sports.component.css'
})
export class SportsComponent {

}
