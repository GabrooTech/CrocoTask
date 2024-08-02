import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  imports: [RouterModule, CommonModule, HttpClientModule]
})
export class NavComponent{
  sidebarItems$ = this.SharedService.getSidebarItems();
  constructor(private SharedService: SharedService) {}
}
