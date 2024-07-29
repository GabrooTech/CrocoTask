import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { CommonModule } from '@angular/common';
import { ImagePair } from '../filter/filter.component';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {
  imagePairs: any[] = [];

  constructor(private sharedService: SharedService) {} 

  ngOnInit(): void {
    this.sharedService.imagePairs$.subscribe((imagePairs: ImagePair[]) => {
      this.imagePairs = imagePairs;
    });
  }
}
