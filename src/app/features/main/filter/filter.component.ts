import { Component, Input, OnInit } from '@angular/core';
import { CategoryItem, Game } from '../../../shared/model/api-response.model';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../shared/services/shared.service';
import { DisplayCategoryEnum } from '../../../shared/enum/shared.enum';
import { signal, WritableSignal } from '@angular/core';

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
  selectedCategory: WritableSignal<CategoryItem | null> = signal<CategoryItem | null>(null);
  uniqueProviderNames: WritableSignal<string[]> = signal<string[]>([]);
  selectedProvider: WritableSignal<string> = signal<string>('All');
  imagePairs: WritableSignal<ImagePair[]> = signal<ImagePair[]>([]);

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    if (this.categories.length > 0) {
      const initialCategory = this.categories[0];
      this.selectedCategory.set(initialCategory);
      this.updateUniqueProviderNames(initialCategory);
      this.selectedProvider.set('All');
      this.updateImagePairs(initialCategory);
    }
  }

  getDisplayName(item: CategoryItem): any {
    return (DisplayCategoryEnum as any)[item.name] || item.name;
  }

  selectCategory(item: CategoryItem): void {
    this.selectedCategory.set(item);
    this.updateUniqueProviderNames(item);
    this.selectedProvider.set('All');
    this.updateImagePairs(item);
  }

  selectProvider(provider: string): void {
    this.selectedProvider.set(provider);
    const selectedCategoryValue = this.selectedCategory();
    if (selectedCategoryValue) {
      this.updateImagePairs(selectedCategoryValue);
    }
  }

  updateUniqueProviderNames(category: CategoryItem): void {
    const providerNames = new Set(
      category.games?.map((game: Game) => game.providerName) || []
    );
    this.uniqueProviderNames.set(['All', ...providerNames]);
  }

  updateImagePairs(category: CategoryItem): void {
    let games = category.games || [];
    if (this.selectedProvider() !== 'All') {
      games = games.filter(game => game.providerName === this.selectedProvider());
    }
    const imagePairs: ImagePair[] = games.map((game: any) => ({
      name: game.name,
      image: game.image,
      image2: game.image2
    }));
    const filteredImagePairs = imagePairs.filter(pair => pair.image && pair.image2);

    this.imagePairs.set(filteredImagePairs);
    this.sharedService.updateImagePairs(filteredImagePairs);
  }
}