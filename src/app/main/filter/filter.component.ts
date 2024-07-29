import { Component, Input, OnInit } from '@angular/core';
import { CategoryItem, Game } from '../../shared/api-response.module';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../shared/shared.service';
import { BehaviorSubject } from 'rxjs';

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
  
  private selectedCategorySubject = new BehaviorSubject<CategoryItem | null>(null);
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  private uniqueProviderNamesSubject = new BehaviorSubject<string[]>([]);
  uniqueProviderNames$ = this.uniqueProviderNamesSubject.asObservable();

  private selectedProviderSubject = new BehaviorSubject<string>('All');
  selectedProvider$ = this.selectedProviderSubject.asObservable();

  private imagePairsSubject = new BehaviorSubject<ImagePair[]>([]);
  imagePairs$ = this.imagePairsSubject.asObservable();

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    console.log(this.categories);
    if (this.categories.length > 0) {
      this.selectedCategorySubject.next(this.categories[0]);
      this.updateUniqueProviderNames(this.categories[0]);
      this.selectedProviderSubject.next('All');
      this.updateImagePairs(this.categories[0]); // Update image pairs on init
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
    this.selectedCategorySubject.next(item);
    this.updateUniqueProviderNames(item);
    this.selectedProviderSubject.next('All'); // Set 'All' as the selected provider when category changes
    this.updateImagePairs(item); // Update image pairs on category selection
  }

  selectProvider(provider: string): void {
    this.selectedProviderSubject.next(provider);
    const selectedCategory = this.selectedCategorySubject.getValue();
    if (selectedCategory) {
      this.updateImagePairs(selectedCategory); // Update image pairs on provider selection
    }
  }

  isSelected(item: CategoryItem): boolean {
    return this.selectedCategorySubject.getValue() === item;
  }

  isProviderSelected(provider: string): boolean {
    return this.selectedProviderSubject.getValue() === provider;
  }

  updateUniqueProviderNames(category: CategoryItem): void {
    const providerNames = new Set(
      category.games?.map((game: Game) => game.providerName) || []
    );
    this.uniqueProviderNamesSubject.next(['All', ...providerNames]);
  }

  updateImagePairs(category: CategoryItem): void {
    let games = category.games || [];
    if (this.selectedProviderSubject.getValue() !== 'All') {
      games = games.filter(game => game.providerName === this.selectedProviderSubject.getValue());
    }
    const imagePairs: ImagePair[] = games.map((game: any) => ({
      name: game.name,
      image: game.image,
      image2: game.image2
    }));
    // Filter out pairs with missing images
    const filteredImagePairs = imagePairs.filter(pair => pair.image && pair.image2);

    // Send the image pairs to the shared service
    this.sharedService.updateImagePairs(filteredImagePairs);
    this.imagePairsSubject.next(filteredImagePairs);
  }
}