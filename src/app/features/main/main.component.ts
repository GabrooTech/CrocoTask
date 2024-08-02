import { Component } from "@angular/core";
import { PromoComponent } from "./promos/promo/promo.component";
import { SharedService } from '../../shared/services/shared.service';
import { CategoryItem } from '../../shared/model/api-response.model';
import { FilterComponent } from './filter/filter.component';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games/games.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [PromoComponent, FilterComponent, CommonModule, GamesComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  categories$: Observable<CategoryItem[]> = this.sharedService.fetchAndFilterCategories();

  constructor(private sharedService: SharedService) {}
}