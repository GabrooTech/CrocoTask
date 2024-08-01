import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  imports: [RouterModule, CommonModule]
})
export class NavComponent implements OnInit{
  sidebarItems: any[] = [];
  constructor(private SharedService: SharedService) {}

  ngOnInit(): void {
    this.SharedService.getSidebarItems().subscribe(data => {
      this.sidebarItems = data;
    });
  }

}
