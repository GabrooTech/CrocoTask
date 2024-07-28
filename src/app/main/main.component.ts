import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { PromoComponent } from "./promos/promo/promo.component";
import { SharedService } from '../shared/shared.service';
import { error } from 'console';
import { ApiResponse, CategoryItem } from '../shared/api-response.module'; 
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
export class MainComponent implements OnInit{
  // Component logic here
  categories: CategoryItem[] = []
  constructor(private sharedService: SharedService){}
  ngOnInit(): void {
    this.fetchCategories();
  }
  fetchCategories(): void {
    this.sharedService.getSlotData().subscribe(
      (response: ApiResponse) => {
        this.categories = response.data
          .slice(1)
          .filter((item: CategoryItem) =>
            item.name &&
            item.platform !== 'mobile' &&
            !/(MOB|mobile|mob)/i.test(item.category || '') &&
            (item.group === '' || item.group === undefined) &&
            (item.games && item.games.length > 0)
          );
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
    // this.sharedService.getProvidersData().subscribe(
    //   (response: any) => {
    //     console.log(response.data);
    //   },
    //   (error: any) => {
    //     console.error('Error fetching categories:', error);
    //   }
    // );
  //   this.sharedService.getSlotsByProvidersData().subscribe(
  //     (response: any) => {
  //       console.log(response);
  //     },
  //     (error: any) => {
  //       console.error('Error fetching categories:', error);
  //     }
  //   );
  }
}