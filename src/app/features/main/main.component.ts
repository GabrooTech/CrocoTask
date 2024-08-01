import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav.component';
import { PromoComponent } from "./promos/promo/promo.component";
import { SharedService } from '../../shared/services/shared.service';
import { CategoryItem } from '../../shared/model/api-response.model';
import { FilterComponent } from './filter/filter.component';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games/games.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavComponent, PromoComponent, FilterComponent, CommonModule, GamesComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  categories: CategoryItem[] = [];

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.sharedService.fetchAndFilterCategories().subscribe(
      (categories: CategoryItem[]) => {
        this.categories = categories;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}
