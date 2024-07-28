import { Component, Input, OnInit } from '@angular/core';
import { CategoryItem, Game } from '../../shared/api-response.module';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../shared/shared.service';

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
    console.log(this.categories);
    if (this.categories.length > 0) {
      this.selectedCategory = this.categories[0];
      this.updateUniqueProviderNames(this.selectedCategory);
      this.selectedProvider = 'All';
      this.updateImagePairs(this.selectedCategory); 
    }
  }

  getDisplayName(item: CategoryItem): string {
    switch (item.name) {
      case 'პოპულარული მთავარზე / ვები':
        return 'Top Slots';
      case 'ახალი თამაშები':
        return 'New Games';
      case 'BUY BONUS':
        return 'Buy Bonus';
      case 'ახალი პროვაიდერი':
        return 'New Provider';
      case 'NEW BUY BONUS':
        return 'New Buy Bonus';
      default:
        return item.name;
    }
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

  isSelected(item: CategoryItem): boolean {
    return this.selectedCategory === item;
  }

  isProviderSelected(provider: string): boolean {
    return this.selectedProvider === provider;
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