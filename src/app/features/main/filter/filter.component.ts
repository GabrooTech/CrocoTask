import { Component, Input, OnInit } from '@angular/core';
import { CategoryItem, Game } from '../../../shared/model/api-response.model';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../shared/services/shared.service';
import { DisplayCategoryEnum } from '../../../shared/enum/shared.enum';
export interface ImagePair {
  name: string;
  image: string;
  image2: string;
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() categories: CategoryItem[] = [];
  selectedCategory: CategoryItem | null = null;
  uniqueProviderNames: string[] = [];
  selectedProvider: string = 'All';
  imagePairs: ImagePair[] = [];

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    if (this.categories.length > 0) {
      this.selectedCategory = this.categories[0];
      this.updateUniqueProviderNames(this.selectedCategory);
      this.selectedProvider = 'All';
      this.updateImagePairs(this.selectedCategory); 
    }
  }

  getDisplayName(item: CategoryItem): any {
    return (DisplayCategoryEnum as any)[item.name] || item.name;
  }

  selectCategory(item: CategoryItem): void {
    this.selectedCategory = item;
    this.updateUniqueProviderNames(item);
    this.selectedProvider = 'All';
    this.updateImagePairs(item); 
  }

  selectProvider(provider: string): void {
    this.selectedProvider = provider;
    if (this.selectedCategory) {
      this.updateImagePairs(this.selectedCategory); 
    }
  }

  updateUniqueProviderNames(category: CategoryItem): void {
    const providerNames = new Set(
      category.games?.map((game: Game) => game.providerName) || []
    );
    this.uniqueProviderNames = ['All', ...providerNames];
  }

  updateImagePairs(category: CategoryItem): void {
    let games = category.games || [];
    if (this.selectedProvider !== 'All') {
      games = games.filter(game => game.providerName === this.selectedProvider);
    }
    const imagePairs: ImagePair[] = games.map((game: any) => ({
      name: game.name,
      image: game.image,
      image2: game.image2
    }));
    const filteredImagePairs = imagePairs.filter(pair => pair.image && pair.image2);

    this.sharedService.updateImagePairs(filteredImagePairs);
  }
}